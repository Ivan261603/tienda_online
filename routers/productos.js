const express= require('express');
const ruta_producto= express.Router();
const conexion= require('../bd_mysql');


ruta_producto.get('/listar_productos',(peticion,respuesta)=>{
    var sql='select * from producto';
    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.render('producto',{produ:rows}); 
        }else{
            respuesta.send('error en la ejecucion de la consulta:'+error); 
        }
    });
})    

 ruta_producto.get('/registrar',(peticion,respuesta)=>{
     respuesta.render('registrar_productos');
 });   


ruta_producto.post('/registrar_productos',(peticion,respuesta)=>{
    var id_producto=peticion.body.id_producto;
    var codigo_prod=peticion.body.codigo_prod;
    var nombre_prod=peticion.body.nombre_prod;
    var precio_prod=peticion.body.precio_prod;
    var stock=peticion.body.stock;
    var sql=`insert into producto(id_producto,codigo_prod,nombre_prod,precio_prod,stock)
    values(${id_producto},${codigo_prod},'${nombre_prod}',${precio_prod},${stock})`;

    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.redirect('/producto/listar_productos');
        }
        else{console.log('error producto'+error);
    }
    });
});

ruta_producto.get('/eliminar/:id',(peticion,respuesta)=>{
    var cod_p=peticion.params.id;
    var sql=`delete from producto where id_producto=${cod_p};`
    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.redirect('/producto/listar_productos');
        }
        else{
            console.log('error al listar'+error);
        }
    });
});

ruta_producto.get('/buscar/:fk_prod',(peticion,respuesta)=>{
    var id_pro=peticion.params.fk_prod;
    var sql="select * from producto where id_producto="+id_pro;
    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.render('actualizar_producto',{producto:rows});
        }
        else{
            respuesta.render('error al realizar la accion '+error);
        }
    });
});

ruta_producto.post('/actualizar_producto',(peticion,respuesta)=>{
    var id_prod=peticion.body.id_producto;
    var cod_p=peticion.body.codigo_prod;
    var nom_prod=peticion.body.nombre_prod;
    var pre_prod=peticion.body.precio_prod;
    var stock=peticion.body.stock;
    var sql=`update producto set codigo_prod=${cod_p},
     nombre_prod='${nom_prod}',
    precio_prod=${pre_prod},stock=${stock} where id_producto=${id_prodn}`;

    conexion.query(sql,(error,rows,fields)=>{
        if(!error){
            respuesta.redirect('/producto/listar_productos');
        }
        else{
            respuesta.send('no encontrado'+error);
        }
    });

});

module.exports= ruta_producto;