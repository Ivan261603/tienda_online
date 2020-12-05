const express= require('express');
const ruta_compras= express.Router();
const conexion= require('../bd_mysql');

function validar(peticion,respuesta,next){
    if(peticion.session.usuario_id){
        next();
    }
    else{
        respuesta.redirect('/');
    }
}
ruta_compras.get('/Listar_compra',validar,(peticion,respuesta)=>{
   var sql=" select * from producto"; 
    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            var user=peticion.session.usuario_id;
            respuesta.render('compra',{comp:rows,usuario:user}); 
        }else{
            respuesta.send('error en la ejecucion de la consulta:'+error); 
        }
    });
});
ruta_compras.get('/registrar_compra/:id_prod',(peticion,respuesta)=>{
    var id_producto=peticion.params.id_prod;
    var cedula=peticion.session.usuario_id[0].cedula;
    var sql="insert into compra(fecha_comp,cantidad_comp,fk_producto,fk_cliente)values(curdate(),1,"+id_producto+","+cedula+")";
    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.redirect('/compra/listar_compra');
        }
        else{
            respuesta.send('error compra'+error);
        }
    });
});
module.exports= ruta_compras;