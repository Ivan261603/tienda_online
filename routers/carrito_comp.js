const express=require('express');

const ruta_carrito=express.Router();
const conexion=require('../bd_mysql');



ruta_carrito.get('/listar',(peticion,respuesta)=>{
     /* respuesta.render('carrito_comp'); */
     
     var sql="select  nombre_prod,precio_prod,cantidad_comp,fecha_comp from compra join producto on id_producto=fk_producto ";
     
     conexion.query(sql,(error,rows,fields)=>{
         if(!error){
            peticion.session.usuario_id=rows;
             respuesta.render('carrito_comp',{lista:rows});
         }
         else{
             respuesta.send('error al realizar la accion'+error);
         }
     });
     
 
    
});

module.exports=ruta_carrito;