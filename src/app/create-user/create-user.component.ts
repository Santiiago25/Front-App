import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';
import { CreateUserRequest } from '../services/createUserRequest';
import { CompanyService } from '../services/company.service';
import { SimpleResultCompany } from '../Model/SimpleResultCompany';
import { SimpleResultEditables } from '../Model/SimpleResultEditables';
import { SimpleResultDepartamentos, Departamento } from '../Model/SimpleResultDepartamentos';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})

export class CreateUserComponent implements OnInit {
  submitted = false;
  inscripcionForm!: FormGroup;
  showModal = false; // Controla la visibilidad del modal
  usuarioAutenticado: string | null = "";
  createerror: string = "";
  editableError: string = "";

  tiposDocumento: string[] = [];
  sexos:string[] = [];
  estados:string[] = [];
  tiposUsuarios:string[] = [];;
  roles:string[] = [];
  empresas:string[] = [];
  NomDepartamentos:string[] = [];
  municipios: string[] = [];
  allDepartamentos: Departamento[] = []; // Lista completa de departamentos y sus municipios


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
  }
  get sexo() {
    return this.formUser.get('sexo') as FormControl;
  }
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
  get empresa() {
    return this.formUser.get('empresa') as FormControl;
  }
  get departamento() {
    return this.formUser.get('departamento') as FormControl;
  }
  get municipio() {
    return this.formUser.get('municipio') as FormControl;
  }

  formUser = new FormGroup({
    'nombres': new FormControl('', Validators.required),
    'Apellidos': new FormControl('', Validators.required),
    'tipoDocumento': new FormControl('', Validators.required),
    'numeroDocumento': new FormControl('', Validators.required),
    'sexo': new FormControl('', Validators.required),
    'correoElectronico': new FormControl('', [Validators.required,Validators.email]),
    'estado': new FormControl('', Validators.required),
    'celular': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    'tipoUsuario': new FormControl('', Validators.required),
    'pass': new FormControl('', Validators.required),
    'username': new FormControl('', Validators.required),
    'rol': new FormControl('', Validators.required),
    'empresa': new FormControl('', Validators.required),
    'departamento': new FormControl('', Validators.required),
    'municipio': new FormControl('', Validators.required)
    //Nombre empresa, direccion, verificar pass pero a nivel de front, departamento y ciudad 
  });
  

  constructor(private formBuilder: FormBuilder,private companyService: CompanyService) {
    this.formUser.get('departamento')?.valueChanges.subscribe(departamento => {
      if (departamento) {
        this.onDepartamentoChange(departamento);
      } else {
        this.municipios = [];
      }
    });
  }

  onDepartamentoChange(departamentoNombre: string): void {
    const departamento = this.allDepartamentos.find(d => d.nombre === departamentoNombre);
    this.municipios = departamento ? departamento.municipios : [];
  }

  ngOnInit(): void {
    this.usuarioAutenticado = localStorage.getItem('usuario');
    this.getCompany();    
    this.getEditables();
    this.getDepartamentos();
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

  getCompany(){
    this.companyService.getCompanyService().subscribe({
      next: (userData) => {
        //console.log("data: ", userData);
        this.empresas = userData.map((company: SimpleResultCompany) => company.company);
      },
      error: (errorData) => {
        //console.error("error: ", errorData);
        this.createerror = "error service";
      },
      complete: () => {
        console.info("Company complet...");
      }
    });
  }

  getEditables(): void {
    this.companyService.getEditablesService().subscribe({
      next: (editables: SimpleResultEditables) => {
        //console.log("editables: ", editables);
        this.tiposDocumento = editables.tiposDocumento;
        this.sexos = editables.sexos;
        this.estados = editables.estados;
        this.tiposUsuarios = editables.tiposUsuarios;
        this.roles = editables.roles;
      },
      error: (errorData) => {
        //console.error("error: ", errorData);
        this.editableError = 'error service';
      },
      complete: () => {
        console.info("Editables complete...");
      }
    });
  }

  getDepartamentos(): void {
    this.companyService.getDepartamentos().subscribe({
      next: (departamentos: SimpleResultDepartamentos) => {
        this.allDepartamentos = departamentos.departamentos;
        this.NomDepartamentos = this.allDepartamentos.map(departamento => departamento.nombre);
        console.log("Nombres de departamentos: ", this.NomDepartamentos);
      },
      error: (errorData) => {
        this.editableError = 'Error al obtener los departamentos';
      },
      complete: () => {
        console.info("Departamentos complete...");
      }
    });
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
