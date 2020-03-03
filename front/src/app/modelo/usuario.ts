//We'll create a data model that will send from the front to the back

export class Usuario{
    constructor(
        public _id:String,
        public nombre: String,
        public apellido: String,
        public correo: String,
        public contrasena :String,
        public repeatContrasena: String,
        public rol: Number,
        public imagen: String,
    ){}
}