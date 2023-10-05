import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';
import { Carrito } from '../interfaces/carrito';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url: string;
  private api: string;
  private fullPath: string;

  constructor(private http: HttpClient) { 
    this.url = environment.apiUrl;
    this.api = 'api/productos';
    this.fullPath = this.url + this.api;
  }

  getProductos(busqueda: any): Observable<Producto[]>{
    //const token = localStorage.getItem("token");
    //const headers = new HttpHeaders().set('Authorization','Bearer ' +token);

    return this.http.post<Producto[]>(this.fullPath,busqueda)

  }
  getProducto(busqueda: any): Observable<Producto>{
    //const token = localStorage.getItem("token");
    //const headers = new HttpHeaders().set('Authorization','Bearer ' +token);
    const value = {
      busqueda: busqueda
    } 
    return this.http.post<Producto>(this.fullPath+'/detalle',value)

  }




}
