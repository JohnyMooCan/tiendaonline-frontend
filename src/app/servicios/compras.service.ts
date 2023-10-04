import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private url: string;
  private api: string;
  private fullPath: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.api = 'api/compra/';
    this.fullPath = this.url + this.api;
   }

  getCompras(): Observable<any>{
    const value = {
      value: localStorage.getItem('value')
    }  
    return this.http.post<any>(this.fullPath,value);
  }

  addCompra(total: number,productos: any[]): Observable<string>{
    const value = {
      value: localStorage.getItem('value'),
      total: total,
      carrito: productos

    }  
    return this.http.post<string>(this.fullPath+'/add',value);

  }
}
