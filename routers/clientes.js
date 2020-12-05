const express= require('express');
const session = require('express-session');
const ruta_cliente= express.Router();
const conexion= require('../bd_mysql');


ruta_cliente.get('/Listar_cliente',(peticion,respuesta)=>{
    var sql='select * from cliente';
    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.render('index',{index:rows}); 
        }else{
            respuesta.send('error en la ejecucion de la consulta:'+error); 
        }
    });
})
ruta_cliente.get('/registrar',(peticion,respuesta)=>{
    respuesta.render('registrar_cliente');
});


ruta_cliente.post('/registrar_cliente',(peticion,respuesta)=>{
    var cedula=peticion.body.cedula;
    var nombre=peticion.body.nombre;
    var direccion=peticion.body.direccion;
    var telefono=peticion.body.telefono;
     var sql=`insert into cliente (cedula,nombre,direccion,telefono)
        values(${cedula},'${nombre}','${direccion}','${telefono}')`;

     conexion.query(sql,(error,rows,fields)=>{
         if(!error){
             respuesta.redirect('/cliente/listar_cliente');
         }
         else{
             console.log('error de cliente'+ error);
         }
     });   
});

ruta_cliente.get('/eliminar/:id',(peticion,respuesta)=>{
    var ced=peticion.params.id;
    var sql=`delete from cliente where cedula=${ced};`
    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.redirect('/cliente/listar_cliente');
        }
        else{
            respuesta.send('errot'+error);
        }

    });
   
});
ruta_cliente.get('/buscar/:id',(peticion,respuesta)=>{
    var id=peticion.params.id;
    var sql="select * from cliente where cedula ="+id;
    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.render('actualizar_cliente',{rows_cliente:rows});
        }
        else{
            respuesta.send('error al buscar cliente'+error);
        }

    });
});
ruta_cliente.post('/actualizar_cliente',(peticion,respuesta)=>{
    var id=peticion.body.cedula;
    var nom=peticion.body.nombre;
    var dir=peticion.body.direccion;
    var tel=peticion.body.telefono;
    var sql=`update cliente set nombre='${nom}',
    direccion='${dir}',telefono='${tel}' where cedula=${id};`
     conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.redirect('/cliente/listar_cliente');
        }
        else{
            respuesta.send('error en la accion'+error);
        }
    }); 
  
});
ruta_cliente.post('/validar_usuario',(peticion,respuesta)=>{
    var log=peticion.body.login;
    var pas=peticion.body.password;
    var sql="select cedula,nombre,rol from cliente where login='"+log+"' and password='"+pas+"' " ;
     /* var sql=`select cedula,nombre,rol from cliente where login=$'{log}' and password=${pas}`; */
     conexion.query(sql,(error,rows,fields)=>{
        if(!error){
             peticion.session.usuario_id=rows;
            if(peticion.session.usuario_id.length>0){
                respuesta.redirect('/compra/listar_compra');
            }else{
                respuesta.redirect('/');
            }
        }else{
            respuesta.send('Error al validar usuario '+error);
        
        } 
           
            
        
         
            
     }); 
      
});

module.exports= ruta_cliente;