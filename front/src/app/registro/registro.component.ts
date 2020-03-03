import { Component, OnInit } from '@angular/core';
//Importamos el modelo de Angular
import { Usuario } from '../modelo/usuario';
//Importamos el servicio de Usuario
import { UsuarioService } from '../servicio/usuario.service';
//Importar el objeto Router
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public identidad;
  public usuarioRegistro: Usuario; //Creamos una variable cuyo valor será el modelo


  constructor(
    private usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.usuarioRegistro = new Usuario('', '', '', '', '', '', 2, '')
  }

  ngOnInit(): void {
  }

  /*  
   Vamos a crear el método de registrarUsuario(), que contendrá toda la lógica de guargar los datos del usuario.
   Conectarse al método registro del servicio y entre ambos comunicarse con la api y la BD
  */
  registrarUsuario() {
    //Imprimir en un console.log los datos del usuario que están llegando en la variable registro
    console.log(this.usuarioRegistro);

    /* 
      Acceder al servicio registro, enviando la variable usuarioRegistro y accedemos a un método del observable 
      que se llama subscribe, para que el observable pueda recoger los datos que se están enviando y poder guardarlos
      en la BD.
      El método subscribe necesita un parámetro de tipo cualquier cosa: any
    */

    this.usuarioService.registro(this.usuarioRegistro).subscribe((response: any) => {
      let usuario = response.usuario;
      this.usuarioRegistro = usuario;

      /* 
        Validar a partur de la existencia del _id si se ha registrado o no un usuario nuevo, es decir,
        si dentro de la respuesta (response.usuario) ya existe un _id nuevo, entonces se nos indica que el usuario
        se ha registrado correctamente
      */
      if (!this.usuarioRegistro._id) {
        alert('Error al registrarse');
      }else{
        alert(`Registro exitoso!!, Inicia sesión con ${this.usuarioRegistro.correo}`);
       
        //Indica que limpie el modelo
        this.usuarioRegistro = new Usuario('', '', '', '', '', '', 2, '');

        //Redireccionamos al componente deseado
        this._router.navigate(['/login'])
      }

    }, error =>{
      let errorMensaje = <any>error;

      if(errorMensaje != null){
        console.error(error);
      }
    }
    );
  }
}


