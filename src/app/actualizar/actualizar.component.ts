import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Departamento, SimpleResultDepartamentos } from '../Model/SimpleResultDepartamentos';
import { CompanyService } from '../services/company.service';
import { LoginServiceService } from '../services/login-service.service';


interface Empresa {
  id: number;
  nit: number;
  company: string;
  manager: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  municipality: string;
}
@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.css'
})
export class ActualizarComponent {

  formUser: FormGroup;
  formbuscar: FormGroup;
  isMenuOpen = false;
  isSubMenuOpenCrear = false;
  isSubMenuOpenActualizar = false;
  departamentoError: string = "";
  usuarioAutenticado: string | null = "";
  editar = false;
  tabla = true;

  NomDepartamentos: string[] = [];
  municipios: string[] = [];
  allDepartamentos: Departamento[] = [];
  createerror: string = "";
  empresas: Empresa[] = [];
  bucarnit: string[] = [];
  empresaEncontrada: Empresa | undefined;

  constructor(private fb: FormBuilder, private companyService: CompanyService, private loginServiceService: LoginServiceService) {
    this.formUser = new FormGroup({
      'nit': new FormControl('', Validators.required),
      'nomEmpresa': new FormControl('', Validators.required),
      'dueñoEmpresa': new FormControl('', Validators.required),
      'correoCorp': new FormControl('', [Validators.required, Validators.email]),
      'celular': new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      'direccion': new FormControl('', Validators.required),
      'departamento': new FormControl('', Validators.required),
      'municipio': new FormControl('', Validators.required)
    });
    this.formUser.get('departamento')?.valueChanges.subscribe(departamento => {
      if (departamento) {
        this.onDepartamentoChange(departamento);
      } else {
        this.municipios = [];
      }
    });
    this.formbuscar = new FormGroup({
      'search': new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    this.usuarioAutenticado = localStorage.getItem('usuario');
    this.getDepartamentos();
    this.getCompany();
  }

  onSubmit(): void {}
  
  onBuscar(): void {
    /*const nit = parseInt(this.formbuscar.get('search')?.value || '', 10); // Convertir a número 
    if (!isNaN(nit)) {
      this.buscarEmpresaPorNit(nit, this.empresas);
      this.buscar = true;
      console.log("buscar ",this.buscar);
    } else {
      console.error("NIT inválido");
    }*/

  }

  getCompany() {
    this.companyService.getCompanyService().subscribe({
      next: (userData) => {
        this.empresas = userData  
      },
      error: (errorData) => {
        this.createerror = "error Obteniendo company...";
        console.error(this.createerror);
      },
      complete: () => {
        console.info("Company complet...", this.empresas);
        
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  toggleSubMenuCrear() {
    this.isSubMenuOpenCrear = !this.isSubMenuOpenCrear;
  }  

  toggleSubMenuActualizar() {
    this.isSubMenuOpenActualizar = !this.isSubMenuOpenActualizar;
  }

  soloNumeros(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // Detener la entrada de caracteres que no sean números
      event.preventDefault();
    }
  }

  logout() {
    this.loginServiceService.logout();
    window.location.reload();
  }

  ////////////////////////////////////////
  
  editEmpresa(empresa: Empresa) {
    this.tabla = false;
    this.editar = true;
    this.formUser.patchValue({
      nit: empresa.nit,
      nomEmpresa: empresa.company,
      dueñoEmpresa: empresa.manager,
      correoCorp: empresa.email,
      celular: empresa.phone,
      departamento: empresa.department,
      municipio: empresa.municipality,
      direccion: empresa.address,
    });
    this.isSubMenuOpenActualizar = true; // Mostrar el formulario de actualización
  }
  volver(){
    this.tabla = true;
    this.editar = false;

  }
}
