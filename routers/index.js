const express=require('express');

const ruta_index=express.Router();



ruta_index.get('/',(peticion,respuesta)=>{
     respuesta.render('validar_usuario');
     /* respuesta.send('holallala'); */
 
    
});

module.exports=ruta_index;