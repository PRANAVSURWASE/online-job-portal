require('dotenv').config();
let express=require ("express");

let app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



let userRoutes = require('./routes/userRoutes');  
let adminRoutes = require('./routes/adminRoutes'); 
let hrRoutes = require('./routes/hrRoutes');
let jobRoutes = require('./routes/jobRoutes');

app.use(express.static('public'));

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/hr', hrRoutes);
app.use("/jobs", jobRoutes);





module.exports=app;

