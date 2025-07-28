require('dotenv').config();
let express=require ("express");

let app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let userRoutes = require('./routes/userRoutes');  
console.log("User routes loaded at /users");

let adminRoutes = require('./routes/adminRoutes'); 

app.use(express.static('public'));

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);



module.exports=app;

