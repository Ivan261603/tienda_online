const express=require('express');

const ruta_stadic=express.Router();
const conexion=require('../bd_mysql');



ruta_stadic.get('/estadisticas',(peticion,respuesta)=>{
    
  var sql="select cli.cedula, precio_prod,cli.nombre,nombre_prod,sum(cantidad_comp)as total_compras from   cliente cli join compra on fk_cliente=cli.cedula join producto on fk_producto=id_producto where precio_prod >500000 group	by cedula";
  conexion.query(sql,(error,rows,fields)=>{
    if(!error){
       peticion.session.usuario_id=rows;
        respuesta.render('estadisticas',{listado:rows});
    }
    else{
        respuesta.send('error al realizar la accion'+error);
    }
});


    
    
 
    
});

ruta_stadic.get('/mostrar',(peticion,respuesta)=>{
    
  var sql="SELECT * FROM cliente WHERE cedula NOT IN ( SELECT cedula FROM cliente join compra on fk_cliente=cedula) ";
  conexion.query(sql,(error,rows,fields)=>{
   
    if(!error){
       peticion.session.usuario_id=rows;
        respuesta.render('mostrar',{listad:rows});
    }
    else{
        respuesta.send('error al realizar la accion'+error);
    }
});


    
    
 
    
});

ruta_stadic.get('/atras',(peticion,respuesta)=>{
  respuesta.redirect('estadisticas');
  /* respuesta.send('holallala'); */

 
});

module.exports=ruta_stadic;