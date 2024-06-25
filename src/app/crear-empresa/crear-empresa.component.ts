import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleResultDepartamentos, Departamento } from '../Model/SimpleResultDepartamentos';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrl: './crear-empresa.component.css'
})
export class CrearEmpresaComponent {
  formUser: FormGroup;
  usuarioAutenticado = " armandito";
  isMenuOpen = false;
  departamentoError: string = "";

  NomDepartamentos: string[] = [];
  municipios: string[] = [];
  allDepartamentos: Departamento[] = [];

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
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
   }

  ngOnInit(): void {
    this.getDepartamentos();
  }

  onSubmit(): void {}

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

  soloNumeros(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // Detener la entrada de caracteres que no sean números
      event.preventDefault();
    }
  }

  logout() {
  }

}
