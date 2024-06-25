import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateUserRequest } from '../services/createUserRequest';
import { CompanyService } from '../services/company.service';
import { SimpleResultCompany } from '../Model/SimpleResultCompany';
import { SimpleResultEditables } from '../Model/SimpleResultEditables';
import { SimpleResultDepartamentos, Departamento } from '../Model/SimpleResultDepartamentos';
import { passwordMatchValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  formUser: FormGroup;
  submitted = false;
  showModal = false; // Controla la visibilidad del modal
  usuarioAutenticado: string | null = "";
  createerror: string = "";
  editableError: string = "";
  departamentoError: string = "";
  isMenuOpen = false; // Controla la visibilidad del menú

  tiposDocumento: string[] = [];
  sexos: string[] = [];
  estados: string[] = [];
  tiposUsuarios: string[] = [];
  roles: string[] = [];
  empresas: string[] = [];
  NomDepartamentos: string[] = [];
  municipios: string[] = [];
  allDepartamentos: Departamento[] = []; // Lista completa de departamentos y sus municipios

  constructor( private companyService: CompanyService, private fb: FormBuilder) {
    this.formUser = new FormGroup({
      'nombres': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required),
      'tipoDocumento': new FormControl('', Validators.required),
      'numeroDocumento': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'correoElectronico': new FormControl('', [Validators.required, Validators.email]),
      'estado': new FormControl('', Validators.required),
      'celular': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      'tipoUsuario': new FormControl('', Validators.required),
      'pass': new FormControl('', Validators.required),
      'passconf': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.required),
      'rol': new FormControl('', Validators.required),
      'empresa': new FormControl('', Validators.required),
      'departamento': new FormControl('', Validators.required),
      'municipio': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
    }, { validators: passwordMatchValidator('pass', 'passconf') });

    this.formUser.get('departamento')?.valueChanges.subscribe(departamento => {
      if (departamento) {
        this.onDepartamentoChange(departamento);
      } else {
        this.municipios = [];
      }
    });
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

  getCompany() {
    this.companyService.getCompanyService().subscribe({
      next: (userData) => {
        this.empresas = userData.map((company: SimpleResultCompany) => company.company);
      },
      error: (errorData) => {
        this.createerror = "error Obteniendo company...";
        console.error(this.createerror);
      },
      complete: () => {
        console.info("Company complet...");
      }
    });
  }

  getEditables(): void {
    this.companyService.getEditablesService().subscribe({
      next: (editables: SimpleResultEditables) => {
        this.tiposDocumento = editables.tiposDocumento;
        this.sexos = editables.sexos;
        this.estados = editables.estados;
        this.tiposUsuarios = editables.tiposUsuarios;
        this.roles = editables.roles;
      },
      error: (errorData) => {
        this.editableError = 'error obteniendo Editables...';
        console.error(this.editableError);
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
      },
      error: (errorData) => {
        this.departamentoError = 'Error al obtener los departamentos';
        console.log(this.departamentoError);
      },
      complete: () => {
        console.info("Departamentos complete...");
      }
    });
  }

  onDepartamentoChange(departamentoNombre: string): void {
    const departamento = this.allDepartamentos.find(d => d.nombre === departamentoNombre);
    this.municipios = departamento ? departamento.municipios : [];
  }

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

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.removeItem('usuario');
    // Redirige al login
  }
}
