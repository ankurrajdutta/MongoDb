const mongodb=require('mongodb');
const getDb = require('../util/database').getDb;

class User{
  constructor(name,email,id,cart){
    this.name=name;
    this.email=email;
    this._id=id?mongodb.ObjectId(id):null;
    this.cart=cart;
  }
  save(){
    const db=getDb();
    let dbOp;
    if(this._id){
      dbOp=db.collection('users').updateOne({_id:this._id},{$set:this})
    }else{
      dbOp=db.collection('users').insertOne(this)
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

   addToCart(product){
    const db=getDb();
    const cartProductIndex=this.cart.items.findIndex(cp=>{return cp.productId.toString()===product._id.toString()})
    let newQuantity=1;
    const updatedCartItems=[...this.cart.items];

    if(cartProductIndex>=0){
      let tempQuantity = this.cart.items[cartProductIndex].quantity;
      console.log(typeof tempQuantity)
      newQuantity= +tempQuantity + 1;
      updatedCartItems[cartProductIndex].quantity=newQuantity;
    }else{
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity
      });
    }
    const updatedCart={items:updatedCartItems};
    return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}})
  }

  static findById(userId){
    const db=getDb();
    return db.collection('users').find({_id:mongodb.ObjectId(userId)}).next()
    .then(user=>{
      console.log(user);
      return user;
    })
    .catch(err=>console.log(err))
  }
}

module.exports = User;
