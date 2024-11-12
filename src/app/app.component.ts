import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../app/shared/footer/footer.component';
import { NavbarComponent } from '../app/shared/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet> <!-- Aquí se cargarán las vistas según las rutas -->
    <app-footer></app-footer>
  `
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
