import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Carrito } from 'src/app/interfaces/carrito';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ComprasService } from 'src/app/servicios/compras.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';
import { DialogData } from 'src/app/interfaces/dialogdata';
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
    private carritoService: CarritoService,
    private comprasService: ComprasService,
    public dialog: MatDialog,) {


  }
  ngAfterViewInit() {


  }
  ngOnInit(){
    setTimeout(() => {
  
    }, 1000);
    this.obtenDetalle()

  }

  async obtenDetalle() {
    this.mostrarSpinner = true;
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
  addCarrito(event: string, producto: Producto) {

    if(producto.cantidad <= 0){
      this.toastr.warning("La cantidad del producto debe ser minimo 1","Aviso");
      return;
    }

    const id: any = localStorage.getItem('value')
    const carrito: Carrito = {
      idUsuario: parseInt(id),
      idProducto: producto.idProducto,
      precio: parseFloat(producto.precio),
      cantidad: producto.cantidad
    }



    this.carritoService.addCarrito(carrito).subscribe({
      next: (v) => {
        if(event == "comprar"){
          this.router.navigate(['/carrito'])
          return;
        }
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

  comprarAhora(producto: Producto){
    this.addCarrito('comprar',producto);

  }

  openDialog(): void {

    const data: DialogData = {
      titulo: '',
      descripcion: '¿Desea realizar la compra del producto ' + this.producto.nombre+ '?'
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === "ok") {
        this.pagar();
      }

    });
  }

  async pagar() {
    const total = parseFloat(this.producto.precio);
    const detalle: Carrito[] = [{
      idProducto: this.producto.idProducto,
      cantidad: this.producto.cantidad,
      nombre: this.producto.nombre,
      precio: total,
      imagen: this.producto.imagen
    }]

    await this.comprasService.addCompra(total, detalle).subscribe({
      next: async (v) => {
        this.toastr.success("La compra se ha realizado exitosamente.", "Compra satisfactoria");
        this.router.navigate(['/compras'])


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




}
