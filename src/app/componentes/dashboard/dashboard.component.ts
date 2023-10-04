import { Component, ElementRef, ViewChild } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto'
import { HttpErrorResponse } from '@angular/common/http';;
import { ProductosService } from 'src/app/servicios/productos.service';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { Carrito } from 'src/app/interfaces/carrito';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //@ViewChild('busqueda', {static: false}) busquedaElem!: ElementRef;
  mostrarSpinner: boolean = false;
  productos: Producto[] = [];
  busqueda: string = "";
  mostrarleyendacuantos: boolean =false;
  cadenacuantosobtenidos: string = "";
  constructor(private productoService: ProductosService,
    private carritoService: CarritoService,
    private toastr: ToastrService) {

  }
  ngAfterViewInit() {
   
  
  }
  ngOnInit(){
    setTimeout(() => {
  
    }, 1000);

    this.getProductos();
  }
  onSubmit(event: any) {
    const busqueda = event.target.busqueda.value;
    this.busqueda = busqueda;
    this.getProductos();
 }
  getProductos() {
    this.mostrarSpinner = true;
    //Obtenemos los productos
    const busqueda = (this.busqueda.length !== 0) ? {
      busqueda : this.busqueda,
    } : undefined
   
    this.productoService.getProductos(busqueda).subscribe(data => {
      console.log(data);
      this.productos = data;
      this.mostrarleyendacuantos = true;
      this.cadenacuantosobtenidos = "Resultados obtenidos: " + data.length
      this.mostrarSpinner = false;
    })/*{
      next: (data) => {
          console.log(data);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e.error);
      }
    })*/
      
  }
  addCarrito(event: any,producto: Producto) {
    console.log("VALOR EVENT")
    
    console.log(event);
    console.log(producto);
    const id: any = localStorage.getItem('value')
    const carrito: Carrito = {
      idUsuario: parseInt(id),
      idProducto: producto.idProducto,
      precio: parseFloat(producto.precio),
      cantidad: producto.cantidad
      }

    this.carritoService.addCarrito(carrito).subscribe({
      next: (v) => {
        this.toastr.success("El producto se ha agregado correctamente en el carrito");
       
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.msg) {
          this.toastr.error(e.error.msg, "Error");
        }
        else {
          this.toastr.error("Error al agregar al carrito, favor de intentar mas tarde", "Error")
        }

      }
    });


  }

  verDetalle(producto: Producto){
    this.toastr.success("Click");
  }
  addCompra(){


  }

}
