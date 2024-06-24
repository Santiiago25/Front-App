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
  showModal = false;
  usuarioAutenticado: string | null = "";
  createerror: string = "";
  editableError: string = "";
  departamentoError: string = "";

  tiposDocumento: string[] = [];
  sexos: string[] = [];
  estados: string[] = [];
  tiposUsuarios: string[] = [];
  roles: string[] = [];
  empresas: string[] = [];
  NomDepartamentos: string[] = [];
  municipios: string[] = [];
  allDepartamentos: Departamento[] = [];

  constructor(private companyService: CompanyService, private fb: FormBuilder) {
    this.formUser = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      sexo: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      tipoUsuario: ['', Validators.required],
      pass: ['', Validators.required],
      passconf: ['', Validators.required],
      username: ['', Validators.required],
      rol: ['', Validators.required],
      empresa: ['', Validators.required],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      direccion: ['', Validators.required]
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

  get f() { return this.formUser.controls; }

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

  getCompany(): void {
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
        console.error(this.departamentoError);
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

  soloNumeros(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  logout(){
    
  }
}
