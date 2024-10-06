import { Component } from '@angular/core';
import { materialModules } from '../../../models/material-imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule ,materialModules],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  rooms = [
    { 
      name: 'Sala de Karaoke', 
      capacity: 10, 
      activities: 'Karaoke', 
      description: 'Sala equipada con un sistema de sonido profesional para karaoke.',
      price: '$15/hora',
      hours: '10:00 - 20:00'
    },
    { 
      name: 'Sala de Videojuegos', 
      capacity: 8, 
      activities: 'Videojuegos', 
      description: 'Sala con consolas de videojuegos y pantallas grandes.',
      price: '$20/hora',
      hours: '12:00 - 22:00'
    },
    // Agregar más salas según sea necesario
  ];

  displayedColumns: string[] = ['name', 'price', 'hours'];
}
