import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ComprasService } from 'src/app/servicios/compras.service'
import { Compra } from 'src/app/interfaces/compra';
import { Producto } from 'src/app/interfaces/producto';
import { Carrito } from 'src/app/interfaces/carrito';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  mostrarvacio: boolean = true;
  mostrarSpinner: boolean = false;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  Columns: string[] = ['nombre', 'imagen','cantidad', 'precio', 'subtotal'];
   lstCompras: Compra[] = [];
   lstDetalle: Carrito[] = [];
   selectedValue: string = "desc";

   ordenamientos= [{
    caption: "Más reciente",
    value: "desc"
   },
    {
      caption: "Más antigüo",
      value: "asc"
    }];

   constructor(private comprasService: ComprasService,
    private toastr: ToastrService){

   }

   ngOnInit(){
    this.getCompras()

  }
  async getCompras(){
    this.mostrarSpinner = true;
    await this.comprasService.getCompras().subscribe({
        next: (data) => {
          console.log(data);
          this.lstCompras = data;
          this.lstDetalle = data.DetalleCompras;
          if(this.lstCompras.length > 0){
            this.mostrarvacio = false;
          }
          else{
            this.mostrarvacio = true;
          }
          this.mostrarSpinner = false;
         
        },
        error: (e: HttpErrorResponse) => {
          this.mostrarSpinner = false;
          if (e.error.msg) {
            this.toastr.error(e.error.msg, "Error");
          }
          else {
            this.toastr.error("Error al obtener información de compras., favor de intentar mas tarde.", "Error")
          }
  
        }
      });
      
      /*data => {
      console.log(data);
      this.lstCompras = data;
      this.lstDetalle = data.DetalleCompras;
      this.mostrarSpinner = false;
    })*/

  }

  onChange(event: any) {
    

    if(event === "asc"){
      //Ascendiente
      this.lstCompras.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
      console.log("Cambio select a asc");
    }
    else{
      //descendiente
      this.lstCompras.sort((a, b) => (a.createdAt > b.createdAt ?  -1 : 1));
    }
    //this.selectedDevice = newValue;
    // ... do other stuff here ...
}

}
