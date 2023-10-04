export interface Carrito {
    idCarrito?:number,
    idUsuario?: number,
    idProducto: number,
    nombre?: string,
    imagen?:string,
    cantidad: number,
    precio: number,
    subtotal?: number,
}