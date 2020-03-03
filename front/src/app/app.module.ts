import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";//Forms module
import { HttpClientModule } from "@angular/common/http"; //HttpClient Module

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { BienvenidaUserComponent } from './bienvenida-user/bienvenida-user.component';
import { FooterComponent } from './footer/footer.component';
import { InterfazComponent } from './interfaz/interfaz.component';
import { AsideComponent } from './aside/aside.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

//Servicios
import{UsuarioService} from "./servicio/usuario.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    BienvenidaUserComponent,
    FooterComponent,
    InterfazComponent,
    AsideComponent,
    EditarPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
