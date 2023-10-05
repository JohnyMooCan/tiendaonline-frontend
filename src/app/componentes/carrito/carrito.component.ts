import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Carrito } from 'src/app/interfaces/carrito';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ComprasService } from 'src/app/servicios/compras.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';
import { DialogData } from 'src/app/interfaces/dialogdata';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  
},)

export class CarritoComponent {
  mostrarSpinner: boolean = false;
  mostrarvacio: boolean = true;
  lstCarrito: Carrito[] = [];
  total: number= 0;
  Columns: string[] = ['nombre', 'imagen','cantidad', 'precio', 'subtotal','actions'];
  constructor(private carritoService: CarritoService, 
    private comprasService: ComprasService, 
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    ){


  }
  ngOnInit(){
    this.getCarrito()

  }

  async getCarrito(){
     //Obtenemos los productos
     this.mostrarSpinner = true;
     await this.carritoService.getCarrito().subscribe({
      next: (data) => {
        console.log(data);
        this.lstCarrito = data;
        if(this.lstCarrito.length == 0){
          this.mostrarvacio = true;
        }
        else{
          this.mostrarvacio = false;
        }
       
        this.mostrarSpinner = false;
       
      },
      error: (e: HttpErrorResponse) => {
        this.mostrarSpinner = false;
        if (e.error.msg) {
          this.toastr.error(e.error.msg, "Error");
        }
        else {
          this.toastr.error("Error al obtener información del carrito., favor de intentar mas tarde.", "Error")
        }

      }
    });/*data => {
      console.log(data);
      this.lstCarrito = data;
    })*/

  }
  deleteRowData(row_obj: Carrito){
   // this.lstCarrito = this.lstCarrito.filter((value,key)=>{
     // return value.idProducto != row_obj.idProducto;
    //});
    this.carritoService.deleteCarrito(row_obj).subscribe({
      next: (v) => {
        this.toastr.success("El producto se ha eliminado correctamente del carrito.","Compra satisfactoria");

         this.getCarrito();
       
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.msg) {
          this.toastr.error(e.error.msg, "Error");
        }
        else {
          this.toastr.error("Error al eliminar el producto en el carrito., favor de intentar mas tarde.", "Error")
        }

      }
    });

  }

  calculatotal(){
    return this.lstCarrito.map(t => t.precio * t.cantidad).reduce((acc, value) => acc + value, 0)
  }
  
  async pagar(){
    await this.comprasService.addCompra(this.total,this.lstCarrito).subscribe({
      next: async (v) => {
        this.toastr.success("La compra se ha realizado exitosamente.","Compra satisfactoria");

         await this.carritoService.vaciarCarrito().subscribe(data => {
            this.router.navigate(['/compras'])
          });
       
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.msg) {
          this.toastr.error(e.error.msg, "Error");
        }
        else {
          this.toastr.error("Error al generar la compra, favor de intentar mas tarde.", "Error")
        }

      }
    });

  }
  
  openDialog(): void {
    if(!this.lstCarrito || this.lstCarrito.length <= 0){
      this.toastr.warning("No hay productos en el carrito.", "Aviso");
      return;
    }

    this.total = this.calculatotal();

    if(this.total === 0){
      this.toastr.warning("Debe haber almenos un producto en el carrito.", "Aviso");
      return;
    }
    const data: DialogData = {
      titulo: '',
      descripcion: '¿Desea realizar la compra?'
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result === "ok"){
        this.pagar();
      }
    
    });
  }
  
}
