export class SimpleResultCompany{
    id: number;
    nit: number;
    company: string;
    manager: string;
    email: string;
    phone: string;
    address: string;
    department: string;
    municipality: string;

        constructor(id: number, nit: number, company: string, manager: string, email: string, phone: string, address: string, department: string, municipality: string){
            this.id = id;  
            this.nit = nit;          
            this.company = company;
            this.manager = manager;
            this.email = email;
            this.phone = phone;
            this.address = address;
            this.department = department;
            this.municipality = municipality;
        }
}