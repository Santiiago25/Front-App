export class SimpleResultEditables {
    tiposDocumento: string[];
    sexos: string[];
    estados: string[];
    tiposUsuarios: string[];
    roles: string[];
  
    constructor(
      tiposDocumento: string[],
      sexos: string[],
      estados: string[],
      tiposUsuarios: string[],
      roles: string[]
    ) {
      this.tiposDocumento = tiposDocumento;
      this.sexos = sexos;
      this.estados = estados;
      this.tiposUsuarios = tiposUsuarios;
      this.roles = roles;
    }
  }
  