export class SimpleResult{
    username: string;
    message: string;
    jwt: string;
    status: string;
    estado: string;

        constructor(username: string, message: string, jwt: string , status: string, estado: string){
            this.username = username;  
            this.message = message;          
            this.jwt = jwt;
            this.status = status;
            this.estado = estado;
        }
}