require("dotenv").config();
let mysql = require("mysql2");


let conn=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME

});
conn.connect((err)=>{
    if(err)
    {
        console.log("Database is not connected"+err.red);
        
    }
    else{
        console.log("Database is connected".green);
    }
});

module.export=conn;