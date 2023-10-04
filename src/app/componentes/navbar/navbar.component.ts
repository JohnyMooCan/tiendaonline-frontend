import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/interfaces/dialogdata';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed: boolean = true;
  constructor(private router: Router,public dialog: MatDialog) {

  }

  cerrar() {

    localStorage.removeItem("token");
    localStorage.removeItem("value");
    this.router.navigate(['/login']);

  }
  irCarrito() {
    this.router.navigate(['/carrito'])
  }
  irTienda() {
    this.router.navigate(['/tienda'])
  }
  irCompras() {
    this.router.navigate(['/compras'])
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

      if(result === "ok"){
        this.cerrar();
      }
      
      //this.animal = result;
    });
  }


}