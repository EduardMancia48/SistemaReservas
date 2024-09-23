import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Importamos 'of' para crear observables
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // Datos quemados simulados
  private reservations: Reservation[] = [
    {
      id: 1,
      userId: 101,
      roomId: 1,
      startTime: new Date('2024-09-25T10:00:00'),
      endTime: new Date('2024-09-25T12:00:00'),
      status: 'confirmed'
    },
    {
      id: 2,
      userId: 102,
      roomId: 2,
      startTime: new Date('2024-09-26T14:00:00'),
      endTime: new Date('2024-09-26T16:00:00'),
      status: 'pending'
    }
  ];

  constructor() {}

  // Simulamos la obtención de reservas
  getReservations(): Observable<Reservation[]> {
    return of(this.reservations); // Devolvemos los datos quemados
  }

  // Simulamos la creación de una reserva
  createReservation(reservation: Reservation): Observable<Reservation> {
    reservation.id = this.reservations.length + 1; // Asignamos un ID simulado
    this.reservations.push(reservation); // Añadimos la nueva reserva a la lista
    return of(reservation); // Devolvemos la reserva creada
  }

  // Simulamos obtener una reserva por su ID
  getReservationById(id: number): Observable<Reservation> {
    const reservation = this.reservations.find(res => res.id === id);
    return of(reservation!); // Devolvemos la reserva encontrada
  }

  // Simulamos la actualización de una reserva
  updateReservation(id: number, updatedReservation: Reservation): Observable<Reservation> {
    const index = this.reservations.findIndex(res => res.id === id);
    if (index !== -1) {
      this.reservations[index] = updatedReservation; // Actualizamos la reserva
    }
    return of(updatedReservation); // Devolvemos la reserva actualizada
  }

  // Simulamos la eliminación de una reserva
  deleteReservation(id: number): Observable<void> {
    this.reservations = this.reservations.filter(res => res.id !== id);
    return of(); // Devolvemos un observable vacío para simular la eliminación
  }
}
