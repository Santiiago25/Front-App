import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginServiceService } from './services/login-service.service';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CreateUserComponent} from './create-user/create-user.component';
import { RouterModule } from '@angular/router';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';

@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent,
    CrearEmpresaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
    
  ],
  providers: [LoginServiceService,
    provideHttpClient(withFetch())]
})
export class AppModule { }
