let mongoose=require('mongoose')
const { Schema } = mongoose;

const orderScehmea=new Schema({
    products:[
        {
            product:{type:Object,required:true},
            quantity:{type:Number,required:true}
        }
    ]
,
user:{
    name:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
}
})

module.exports=mongoose.model('Order',orderScehmea)