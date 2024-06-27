import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginServiceService } from './services/login-service.service';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CreateUserComponent} from './create-user/create-user.component';
import { RouterModule } from '@angular/router';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './validators/interceptors';
import { InicioComponent } from './inicio/inicio.component';
import { ActualizarComponent } from './actualizar/actualizar.component';

@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent,
    CrearEmpresaComponent,
    InicioComponent,
    ActualizarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
    
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, LoginServiceService,
    provideHttpClient(withFetch()),]
})
export class AppModule { }
