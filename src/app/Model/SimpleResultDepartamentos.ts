export class Municipio {
    nombre: string;
  
    constructor(nombre: string) {
      this.nombre = nombre;
    }
}
  
export class Departamento {
    nombre: string;
    municipios: string[];
  
    constructor(nombre: string, municipios: string[]) {
      this.nombre = nombre;
      this.municipios = municipios;
    }
}
  
  export class SimpleResultDepartamentos {
    departamentos: Departamento[];
  
    constructor(departamentos: Departamento[]) {
      this.departamentos = departamentos;
    }
  }
  