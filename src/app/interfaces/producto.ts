export interface Producto {
    idProducto: number,
    nombre: string,
    descripcion: string,
    precio: string,
    imagen: string,
    cantidad: number , //Esta variable su usa inicamente para obtener la cantidad a enviar al carrto
}