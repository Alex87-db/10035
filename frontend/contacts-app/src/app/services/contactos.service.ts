import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  private apiUrl = 'http://localhost:5083/Contactos';

  constructor(private http: HttpClient) { }

  obtenerContactos(search: string = ''): Observable<Contacto[]> {
    const url = search ? `${this.apiUrl}?search=${encodeURIComponent(search)}` : this.apiUrl;
    return this.http.get<Contacto[]>(url);
  }

  agregarContacto(contacto: Partial<Contacto>): Observable<Contacto> {
    return this.http.post<Contacto>(this.apiUrl, contacto);
  }

  eliminarContacto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
