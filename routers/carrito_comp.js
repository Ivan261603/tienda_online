const express=require('express');

const ruta_carrito=express.Router();
const conexion=require('../bd_mysql');



ruta_carrito.get('/listar',(peticion,respuesta)=>{
     var cedula= peticion.session.usuario_id[0].cedula;
    
     var sql="select  nombre_prod,precio_prod,cantidad_comp,fecha_comp,id_compra from compra join producto on id_producto=fk_producto where fk_cliente= "+cedula;
     
     conexion.query(sql,(error,rows,fields)=>{
         if(!error){
          
             respuesta.render('carrito_comp',{lista:rows});
         }
         else{
             respuesta.send('error al realizar la accion'+error);
         }
     });
     
 
    
});
ruta_carrito.get('/eliminar/:comp',(peticion,respuesta)=>{
    var comp=peticion.params.comp;
    var sql=`delete from compra where id_compra=${comp};`
    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.redirect('/carrito_comp/listar');
        }
        else{
            respuesta.send('errot'+error);
        }

    });
   
});

ruta_carrito.get('/volver',(peticion,respuesta)=>{
    respuesta.redirect('/');
    /* respuesta.send('holallala'); */

   
});

module.exports=ruta_carrito;