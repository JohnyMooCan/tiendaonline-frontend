import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/interfaces/dialogdata';
import { SesionService } from 'src/app/servicios/sesion.service';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed: boolean = true;
  sesioniniciada: boolean = false;
  

  constructor(private router: Router, public dialog: MatDialog,
    private sesionService: SesionService) {

  }

  ngOnInit() {

    this.sesioniniciada = this.sesionService.sesionIniciada();
  }



  navegar(seccion: string) {
    this.sesioniniciada = this.sesionService.sesionIniciada();

    if (seccion) {
      switch (seccion) {
        case 'carrito':
          case 'compras':
          case 'login':
          case 'registrarse':
          case 'tienda':
            this.router.navigate([seccion]);
          break;
        
        case 'cerrar':
          this.openDialog();
          break;
          
          
      }
    }

  }


  cerrar() {

    localStorage.removeItem("token");
    localStorage.removeItem("value");
    this.router.navigate(['/tienda']);
    window.location.reload();

  }

  openDialog(): void {
    const data: DialogData = {
      titulo: '',
      descripcion: '¿Seguro que desea cerrar sesión?'
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === "ok") {
        this.cerrar();
      }

      //this.animal = result;
    });
  }

}
