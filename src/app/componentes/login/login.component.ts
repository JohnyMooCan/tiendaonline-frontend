import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = "";
  password: string = "";
  mostrarSpinner: boolean = false;
  constructor(private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private router: Router) {

  }

  login() {
    if (this.nombre == '' || this.password == '') {
      this.toastr.error("Todos los campos son obligatorios.", "Error");
      return;
    }

    const usuario: Usuario = {
      nombre: this.nombre,
      password: this.password
    }

    this.mostrarSpinner = true;
    
    this.usuarioService.login(usuario).subscribe({
      next: (data) => {
        const datos: any = data;
    
        localStorage.setItem('token', datos.token);
        localStorage.setItem('value', datos.value);

        this.router.navigate(['/tienda'])
      },
      error: (e: HttpErrorResponse) => {
        
        console.log(e)
        if (e.error.msg) {
          this.toastr.error(e.error.msg, "Error");
        }
        else {
          this.toastr.error("Error al iniciar sesión, favor de intentar mas tarde", "Error")
        }
        this.mostrarSpinner = false
      }
    })
    /*this.usuarioService.login(usuario).subscribe({
      next: (token) => {
        this.mostrarSpinner = false;
       

        this.router.navigate(['/tienda']);
        localStorage.setItem('token',token);

      },
      error: (e: HttpErrorResponse) => {
        this.mostrarSpinner = false;
        console.log(e)
        if (e.error.msg) {
          this.toastr.error(e.error.msg, "Error");
        }
        else {
          this.toastr.error("Error al iniciar sesión, favor de intentar mas tarde", "Error")
        }
      }
    })*/

  }

}
