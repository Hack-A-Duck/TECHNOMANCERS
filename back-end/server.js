let mysql= require("mysql");
let dotenv= require("dotenv");
dotenv.config({
    path: "./config.env"
})

let connection= mysql.createPool({
    connectionLimit: 9,     //maximum connections to the database
    waitForConnections: true,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    multipleStatements: true
})

connection.getConnection(function(err,conn){
    if (err) {
        console.log(err);
    }
    else{
        console.log("connected..");
    }
    // conn.release();
})

console.log(connection._allConnections.length);   

module.exports = connection;

let app= require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server started at port 5000");
})