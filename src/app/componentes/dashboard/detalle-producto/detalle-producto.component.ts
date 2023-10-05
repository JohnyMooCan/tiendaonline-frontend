import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Carrito } from 'src/app/interfaces/carrito';
import { CarritoService } from 'src/app/servicios/carrito.service';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  mostrarSpinner: boolean = false;
  producto: Producto = {
    idProducto: 0,
    cantidad: 0,
    descripcion: "",
    imagen: "",
    nombre: "",
    precio: "",
    calificacion: 0
  };
  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private productoServide: ProductosService,
    private carritoService: CarritoService,){


  }
  ngAfterViewInit() {
   
    
  }
  ngOnInit(){
    this.obtenDetalle()

  }
  
  async obtenDetalle(){

    const id = this.route.snapshot.paramMap.get('id')!;

    await this.productoServide.getProducto(id).subscribe({
      next: (data) => {
        this.mostrarSpinner = false; 
        this.producto = data;
        this.producto.cantidad = 1;     
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.msg) {
          this.mostrarSpinner = false; 
          this.toastr.error(e.error.msg, "Error");
        }
        else {
          this.mostrarSpinner = false; 
          this.toastr.error("Error al obtener información del producto, favor de intentar mas tarde", "Error")
        }

      }
    });
    
  
  }
  addCarrito(event: any,producto: Producto) {
   
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

}
