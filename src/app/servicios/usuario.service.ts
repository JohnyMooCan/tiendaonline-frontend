import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string;
  private api: string;
  private fullPath: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.api = 'api/usuario/';
    this.fullPath = this.url + this.api;
  }

  registrarse(usuario: Usuario): Observable<any> {
    return this.http.post(this.fullPath, usuario);

  }

  login(usuario: Usuario): Observable<string> {
    return this.http.post<string>(this.fullPath + '/login', usuario);
  }
}
