import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';
import { CreateUserRequest } from '../services/createUserRequest';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})

export class CreateUserComponent implements OnInit {
  submitted = false;
  inscripcionForm!: FormGroup;
  showModal = false; // Controla la visibilidad del modal

  usuarioAutenticado = 'Pepito'; // Simulación del nombre del usuario autenticado

  tiposDocumento = ['DNI', 'Pasaporte', 'Cédula'];
  sexos = ['Masculino', 'Femenino', 'Otro'];
  estados = ['activo', 'inactivo'];
  tiposUsuarios = ['Administrador', 'Ejecutivo'];
  roles = ['INVITED', 'INVITED2']

  get nombres() {
    return this.formUser.get('nombres') as FormControl;
  }
  get Apellidos() {
    return this.formUser.get('Apellidos') as FormControl;
  }
  get tipoDocumento() {
    return this.formUser.get('tipoDocumento') as FormControl;
  }
  get numeroDocumento() {
    return this.formUser.get('numeroDocumento') as FormControl;
  }/*
  get sexo() {
    return this.formUser.get('sexo') as FormControl;
  }*/
  get correoElectronico() {
    return this.formUser.get('correoElectronico') as FormControl;
  }
  get estado() {
    return this.formUser.get('estado') as FormControl;
  }
  get celular() {
    return this.formUser.get('celular') as FormControl;
  }
  get tipoUsuario() {
    return this.formUser.get('tipoUsuario') as FormControl;
  }
  get pass() {
    return this.formUser.get('pass') as FormControl;
  }
  get username() {
    return this.formUser.get('username') as FormControl;
  }
  get rol() {
    return this.formUser.get('rol') as FormControl;
  }

  formUser = new FormGroup({
    'nombres': new FormControl('', Validators.required),
    'Apellidos': new FormControl('', Validators.required),
    'tipoDocumento': new FormControl('', Validators.required),
    'numeroDocumento': new FormControl('', Validators.required),
    //'sexo': new FormControl('', Validators.required),
    'correoElectronico': new FormControl('', [Validators.required,Validators.email]),
    'estado': new FormControl('', Validators.required),
    'celular': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    'tipoUsuario': new FormControl('', Validators.required),
    'pass': new FormControl('', Validators.required),
    'username': new FormControl('', Validators.required),
    'rol': new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }  

  onSubmit(): void {
    this.submitted = true;

    if (this.formUser.invalid) {
      console.log('formulario invalido')
      return;
    }
    const username = this.formUser.get('username')?.value || '';
    const password = this.formUser.get('pass')?.value || '';
    const roleListName = [this.formUser.get('rol')?.value].filter((rol): rol is string => rol != null);
    const estado = this.formUser.get('estado')?.value || '';

    const roleRequest = { roleListName };
    const json = new CreateUserRequest(username, password, roleRequest, estado);

    console.log('Formulario enviado', json);
    this.openModal();
  }
   // Métodos simulados para las opciones del menú
  crearUsuario() {
    console.log('Crear usuario');
  }

  actualizarUsuario() {
    console.log('Actualizar usuario');
  }

  soloNumeros(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    
    if (!pattern.test(inputChar)) {
      // Detener la entrada de caracteres que no sean números
      event.preventDefault();
    }
  }

  // Métodos para manejar el popup modal
  openModal() {
    this.showModal = true;
    console.log('modal  ',this.showModal);
  }

  closeModal() {
    console.log('modal false');
    this.showModal = false;
  }
}
