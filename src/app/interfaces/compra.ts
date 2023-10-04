import { Carrito } from "./carrito";

export interface Compra {
    idUsuario: number,
    createdAt: Date,
    total: number,
    DetalleCompras?: Carrito[];
}