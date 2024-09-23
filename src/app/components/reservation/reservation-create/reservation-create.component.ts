import { Component, Sanitizer } from '@angular/core';
import { ReservationService } from '../../../service/reservation.service';
import { Reservation } from '../../../models/reservation.model';
import { CommonModule } from '@angular/common';  
import {FormsModule} from '@angular/forms'
@Component({
  standalone:true,
  imports:[FormsModule],
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent {
  reservation: Reservation = {
    id: 0,
    userId: 0, // Aquí deberías obtener el ID del usuario autenticado
    roomId: 0,
    startTime: new Date(),
    endTime: new Date(),
    status: 'pending'
  };

  constructor(private reservationService: ReservationService) {}

  onSubmit(): void {
    this.reservationService.createReservation(this.reservation).subscribe(
      (response) => {
        console.log('Reserva creada:', response);
        // Aquí puedes redirigir al usuario o mostrar una notificación
      },
      (error) => {
        console.error('Error al crear la reserva:', error);
      }
    );
  }
}
