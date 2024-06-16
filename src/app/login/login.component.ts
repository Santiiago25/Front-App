import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms'; 
import { LoginServiceService } from '../services/login-service.service';
import { LoginRequest } from '../services/loginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: string = "";
  estado: string = "";

  get username() {
    return this.formUser.get('username') as FormControl;
  }
  get password() {
    return this.formUser.get('password') as FormControl;
  }

  formUser = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  procesar() {
    console.log(this.formUser.value);
  }

  constructor(private loginService: LoginServiceService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    const username = this.formUser.get('username')?.value || '';
    const password = this.formUser.get('password')?.value || '';

    const json = new LoginRequest(username, password);

    this.loginService.login(json).subscribe({
      next: (userData) => {
        console.log("data: ", userData.estado);
        this.estado = userData.estado;
        if (this.estado === "activo") {
          this.router.navigateByUrl('/createUser');
        } else {
          this.loginError = 'Usuario inactivo, comunícate con el administrador.';
        }
      },
      error: (errorData) => {
        console.error("error: ", errorData);
        this.loginError = errorData.message || 'An error occurred';
      },
      complete: () => {
        console.info("Login completo");
      }
    });
  }
}
