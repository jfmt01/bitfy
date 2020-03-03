import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { BienvenidaUserComponent } from './bienvenida-user/bienvenida-user.component';
import { AsideComponent } from './aside/aside.component';
import { InterfazComponent } from './interfaz/interfaz.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {path: 'welcome', component: BienvenidaUserComponent},
  {path: 'aside', component: AsideComponent},
  {path: 'interfaz', component: InterfazComponent},
  {path: 'editar', component: EditarPerfilComponent},
  {path: 'footer', component: FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
