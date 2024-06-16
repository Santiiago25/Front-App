import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginServiceService } from './services/login-service.service';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CreateUserComponent} from './create-user/create-user.component'

@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [LoginServiceService,
    provideHttpClient(withFetch())]
})
export class AppModule { }
