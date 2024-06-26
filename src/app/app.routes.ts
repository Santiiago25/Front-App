import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component'
import { AuthGuard } from './auth.guard'; // Asegúrate de ajustar la ruta según tu estructura
import { NgModule } from '@angular/core';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { InicioComponent } from './inicio/inicio.component';


export const routes: Routes = [
    {path:'inicio', component: InicioComponent},
    {path:'login', component: LoginComponent},
    {path: 'createUser', component:CreateUserComponent, canActivate: [AuthGuard]},
    {path: 'createCompany', component:CrearEmpresaComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }