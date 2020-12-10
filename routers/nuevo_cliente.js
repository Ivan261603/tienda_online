const express= require('express');
const session = require('express-session');
const ruta_nuevo_cliente= express.Router();
const conexion= require('../bd_mysql');


ruta_nuevo_cliente.get('/nuevo_cliente',(peticion,respuesta)=>{
    respuesta.render('nuevo_cliente');
});


ruta_nuevo_cliente.post('/nuevo_cliente',(peticion,respuesta)=>{
    var cedula=peticion.body.cedula;
    var nombre=peticion.body.nombre;
    var direccion=peticion.body.direccion;
    var telefono=peticion.body.telefono;
    var login=peticion.body.login;
    var password=peticion.body.password;
    
     var sql=`insert into cliente (cedula,nombre,direccion,telefono,login,password,rol)
        values(${cedula},'${nombre}','${direccion}','${telefono}','${login}',${password},'cliente')`;

     conexion.query(sql,(error,rows,fields)=>{
         if(!error){
             respuesta.render('validar_usuario');
         }
         else{
             console.log('error de cliente'+ error);
         }
     });   
});

module.exports= ruta_nuevo_cliente;