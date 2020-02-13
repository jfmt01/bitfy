/*
    Se encaragará de recibir los datos que el usuario envía desde la vista, procensandolos
    para enviarlos al modelo y que este los pueda corroborar con BD para posteriormenñte guardarlos.
    También tendrá toda la lógica de las consultas, actualizaciones y eliminaciones.
*/
const Usuario = require('../modelo/usuario'); //Importamos el modelo de usuario

const crearUsuario = (req,res) =>{
    //Instanciar el objeto Usuario

    let usuario = new Usuario();
  
    //Guarda el cuerpo de la petición para mejorar acceso a los datos que el usuario está enviando

    let propiedades = req.body;

    //Guardamos las propiedades del json de la petición en la propiedad correspondiente del modelo
    usuario.nombre = propiedades.nombre;
    usuario.apellido = propiedades.apellido;
    usuario.correo = propiedades.correo;
    usuario.contrasena = propiedades.contrasena;
    usuario.rol = 'usuario';
    usuario.imagen = null;

    //Guardar y validar los datos
    usuario.save((err, usuarioNuevo)=>{
        if(err){
            //El primer error a validar será a nivel de servidor e infraestructura, para esto existen states.
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!usuarioNuevo){
                //404 -> Página no encontrada
                //200 -> OK, una alerta indicando que hay datosa inválidos
                res.status(200).send({message : 'No es posible realizar el registro. Datos no válidos'});
            }else{
                //200
                res.status(200).send({usuario: usuarioNuevo});
            }
        }
    });
}

module.exports = {
    crearUsuario
}