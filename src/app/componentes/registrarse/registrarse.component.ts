import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {
  usuario: string = "";
  nombre: string = "";
  apellidos: string ="";
  password: string = "";
  password2: string = "";
  
  mostrarSpinner: boolean = false;

  constructor(private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private router: Router) { }
  addUsuario() {

    if (this.usuario == '' || this.password == '' || this.password2 == '') {
      this.toastr.error("Todos los campos son obligatorios.", "Error");
      return;
    }

    if (this.password != this.password2) {
      this.toastr.error("Las contraseñas capturadas no coinciden.", "Error");
      return;
    }

    const usuario: Usuario = {
      usuario: this.usuario,
      apellidos: "Vazquez Colli",
      nombre: "Juanito",
      password: this.password
    }

    this.mostrarSpinner = true;
    this.usuarioService.registrarse(usuario).subscribe({
      next: (v) => {
        this.mostrarSpinner = false;
        this.toastr.success("El usuario " + usuario.usuario + " se creo exitosamente.", "Usuario registrado");
        this.router.navigate(['/login']);

      },
      error: (e: HttpErrorResponse) => {
        this.mostrarSpinner = false;
        if (e.error.msg) {
          this.toastr.error(e.error.msg, "Error");
        }
        else {
          this.toastr.error("Error al registrarse, favor de intentar mas tarde", "Error")
        }
      }
    })

  }

}
