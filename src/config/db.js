const mysql = require('mysql');


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "papeleriabranch"
    //database: "inventario"
})


connection.connect((err)=>{
    if(err){
        console.log("Hubo error "+err);
        return;
    }
    console.log("Conectado a la DB");
})

module.exports = connection;