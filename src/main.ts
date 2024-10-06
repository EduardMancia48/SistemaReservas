import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core'; // Importar esto para usar HttpClientModule
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { RoomListComponent } from './app/components/rooms/room-list/room-list.component';
import { RoomDetailComponent } from './app/components/rooms/room-detail/room-detail.component';
import { ReservationListComponent } from './app/components/reservation/reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './app/components/reservation/reservation-detail/reservation-detail.component';
import { ReservationCreateComponent } from './app/components/reservation/reservation-create/reservation-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule), // Añadir HttpClientModule aquí
    provideRouter([
      { path: 'rooms', component: RoomListComponent },
      { path: 'rooms/create', component: RoomDetailComponent },
      { path: 'rooms/edit/:id', component: RoomDetailComponent },
      { path: 'reservations', component: ReservationListComponent },
      { path: 'reservations/create', component: ReservationCreateComponent },
      { path: 'reservations/:id', component: ReservationDetailComponent },
      { path: '', redirectTo: '/rooms', pathMatch: 'full' },
      { path: '**', redirectTo: '/rooms' }
    ])
  ]
}).catch(err => console.error(err));
