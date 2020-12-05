const mysql=require('mysql');

var coneccion= mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database: "bd_tienda"
}
);
coneccion.connect((error)=>{
    if (!error){
        console.log('se realizo la coneccion');


    }
    else{
        console.log(' error'+ error);
    }
});
module.exports=coneccion;