import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private router: Router,private toastr: ToastrService) { 

  }
  sesionIniciada(): boolean{
    return (localStorage.getItem('token') && localStorage.getItem('value')) ? true : false;
  }


  validaAcceso(){
    if(!this.sesionIniciada()){
    
      this.toastr.error("Es necesario iniciar sesión para poder acceder a este apartado", "Error");
      this.router.navigate(['/login']);
      return;
    }

  }
  sinSesion(){
    this.toastr.error("Es necesario iniciar sesión para poder acceder a este apartado", "Error");
    this.router.navigate(['/login']);

  }
}
