import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrito } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private url: string;
  private api: string;
  private fullPath: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.api = 'api/carrito/';
    this.fullPath = this.url + this.api;
  }

  addCarrito(carrito: Carrito): Observable <string>{
    return this.http.post<string>(this.fullPath + '/add', carrito);

  }
  deleteCarrito(carrito: Carrito): Observable <string>{
    const value = {
      value: localStorage.getItem('value'),
      idProducto: carrito.idProducto
    } 
    return this.http.post<string>(this.fullPath + '/delete', value);

  }

  getCarrito(): Observable<Carrito[]>{
    const value = {
      value: localStorage.getItem('value')
    }  
    return this.http.post<Carrito[]>(this.fullPath,value);
  }

  vaciarCarrito(): Observable<string>{
    const value = {
      value: localStorage.getItem('value')
    }  
    return this.http.post<string>(this.fullPath+ '/vaciar',value);
  }
}
