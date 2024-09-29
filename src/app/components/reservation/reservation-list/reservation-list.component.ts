import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../service/reservation.service';
import { Reservation } from '../../../models/reservation.model';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { materialModules } from '../../../models/material-imports';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, RouterModule, materialModules],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.getReservations();
  }

  // Aquí nos suscribimos al servicio para obtener las reservas simuladas
  getReservations(): void {
    this.reservationService.getReservations().subscribe(data => {
      this.reservations = data;  // Asigna los datos a la propiedad 'reservations'
      console.log('Reservas cargadas:', this.reservations);  // Verifica los datos en la consola
    });
  }
}
