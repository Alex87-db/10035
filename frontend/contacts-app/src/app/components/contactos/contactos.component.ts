import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactosService, Contacto } from '../../services/contactos.service';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contactos.component.html'
})
export class ContactosComponent implements OnInit {

  contactos: Contacto[] = [];
  nuevo = { nombre: '', telefono: '' };

  constructor(private servicio: ContactosService) { }

  ngOnInit(): void {
    this.cargarContactos();
  }

  cargarContactos(search: string = ''): void {
    this.servicio.obtenerContactos(search)
      .subscribe({
        next: (data) => this.contactos = data,
        error: (err) => console.error('Error al obtener contactos', err)
      });
  }

  buscar(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cargarContactos(input.value);
  }

  agregar(): void {
    if (!this.nuevo.nombre.trim() || !this.nuevo.telefono.trim()) return;

    this.servicio.agregarContacto(this.nuevo)
      .subscribe({
        next: () => {
          this.nuevo = { nombre: '', telefono: '' };
          this.cargarContactos();
        },
        error: (err) => console.error('Error al agregar contacto', err)
      });
  }

  eliminar(id: number): void {
    this.servicio.eliminarContacto(id)
      .subscribe({
        next: () => this.cargarContactos(),
        error: (err) => console.error('Error al eliminar contacto', err)
      });
  }
}
