const express=require('express');
const body_parser=require('body-parser');
var session=require('express-session');

const ruta_cliente=require('./routers/clientes');
const ruta_productos=require('./routers/productos');
const ruta_compras=require('./routers/compras');
const ruta_index=require('./routers/index');
const ruta_carrito=require('./routers/carrito_comp');


var Servidor = express();



Servidor.set('view engine','pug');
Servidor.set('views',__dirname+'/views');

Servidor.use(express.static(__dirname+'/public'));

Servidor.use(body_parser.urlencoded({extended:true}));
Servidor.set(body_parser.json());

Servidor.use(session({
    secret:"mi_texto_hidden",
    resave:false,
    saveUninitialized:false
}));


/*routers*/
Servidor.use('/cliente',ruta_cliente);
Servidor.use('/producto', ruta_productos);
Servidor.use('/compra', ruta_compras);
Servidor.use('/',ruta_index);
Servidor.use('/carrito_comp',ruta_carrito);



Servidor.listen(3000,()=>{
    console.log("El servidor se esta ejecutando  el puerto 3000");
});