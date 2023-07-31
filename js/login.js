class Logearte {
    constructor(user, pass, mail) {
        this.user = user;
        this.pass = pass;
        this.mail = mail;
    }

     datosusuario() {

         return "-"  + this.user + "<br>" + this.mail;
    }
    
     getUser() {
        return this.user;
    }

     getMail() {
         return this.mail;
     }
}