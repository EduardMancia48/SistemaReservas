import { Routes } from '@angular/router';
import { RoomListComponent } from './components/rooms/room-list/room-list.component';
import { ReservationListComponent } from './components/reservation/reservation-list/reservation-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' }, // Redirigir a 'rooms' por defecto
  { path: 'rooms', component: RoomListComponent },
  { path: 'reservations', component: ReservationListComponent },
];