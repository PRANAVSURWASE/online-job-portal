require('dotenv').config();
let express=require ("express");
let cors = require('cors');

let app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));


let userRoutes = require('./routes/userRoutes');  
let adminRoutes = require('./routes/adminRoutes'); 
let hrRoutes = require('./routes/hrRoutes');
let jobRoutes = require('./routes/jobRoutes');
let contactRoutes = require('./routes/contactRoutes');
let authRoutes = require('./routes/authRoutes');
let scheduleRoutes = require("./routes/scheduleRoutes");

app.use(express.static('public'));

app.use("/auth", authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/hr', hrRoutes);
app.use("/jobs", jobRoutes);
app.use('/contact', contactRoutes);
app.use('/schedules',scheduleRoutes)



module.exports=app;

