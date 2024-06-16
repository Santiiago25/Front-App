import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component'
import { AuthGuard } from './auth.guard'; // Asegúrate de ajustar la ruta según tu estructura
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {path:'',redirectTo:'/login', pathMatch:'full'},
    {path:'login', component: LoginComponent},
    {path: 'createUser', component:CreateUserComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }