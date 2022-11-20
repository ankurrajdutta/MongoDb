const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const User=require('./models/user');
const mongoose=require('mongoose')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById("6378bfe34c1c6576bdd789f4")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user._id, user.cart);
//       next();
//     })
//     .catch((err) => console.log(err));
 
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

 mongoose.connect(
   "mongodb+srv://Ankur:f5heVMRr5lzQuOqs@cluster0.z6ddirp.mongodb.net/test"
 ).then(result=>{
   console.log("Connected!!")
   app.listen(3000)})
 .catch(err=>console.log(err));
