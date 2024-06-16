import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})

export class CreateUserComponent implements OnInit {
  submitted = false;
  inscripcionForm!: FormGroup;

  usuarioAutenticado = 'Pepito'; // Simulación del nombre del usuario autenticado

  tiposDocumento = ['DNI', 'Pasaporte', 'Cédula'];
  sexos = ['Masculino', 'Femenino', 'Otro'];
  estados = ['Activo', 'Inactivo'];
  tiposUsuario = ['Administrador', 'Ejecutivo'];

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
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }  

  onSubmit(): void {
    
  }
  get f() {
    return this.inscripcionForm.controls;
  }

  // Métodos simulados para las opciones del menú
  crearUsuario() {
    console.log('Crear usuario');
  }

  actualizarUsuario() {
    console.log('Actualizar usuario');
  }
}
