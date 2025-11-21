import { Component } from '@angular/core';
import { ContactosComponent } from './components/contactos/contactos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactosComponent],
  template: `<app-contactos></app-contactos>`
})
export class AppComponent { }
