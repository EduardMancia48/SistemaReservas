import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../app/shared/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  template: `

    <app-navbar></app-navbar>
    <router-outlet></router-outlet> <!-- Aquí se cargarán las vistas según las rutas -->
  
  `
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
