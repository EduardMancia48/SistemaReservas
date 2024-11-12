import { HomeComponent } from './app/components/public/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RoomAvailabilityComponent } from './app/components/rooms/room-availability/room-availability.component';
import { RoomCreateComponent } from './app/components/rooms/room-create/room-create.component';
import { RoomEditComponent } from './app/components/rooms/room-edit/room-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { RoomListComponent } from './app/components/rooms/room-list/room-list.component';
import { RoomDetailComponent } from './app/components/rooms/room-detail/room-detail.component';
import { ReservationListComponent } from './app/components/reservation/reservation-list/reservation-list.component';
import { ReservationDetailComponent } from './app/components/reservation/reservation-detail/reservation-detail.component';
import { ReservationCreateComponent } from './app/components/reservation/reservation-create/reservation-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleService } from './app/services/role.service';
import { UserService } from './app/services/user.service';
import { RoomService } from './app/services/room.service';
import { ReservationService } from './app/services/reservation.service';
import { ReservationStatusService } from './app/services/reservation-status.service';
import { ContactService } from './app/services/contact.service';
import { ReservationHistoryService } from './app/services/reservation-history.service';
import { ProfileComponent } from './app/components/user/user-profile/user-profile.component';
import { UserLoginComponent } from './app/components/user/user-login/user-login.component';
import { UserRegisterComponent } from './app/components/user/user-register/user-register.component';
import { UbicacionService } from './app/services/ubicacion.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'rooms', component: RoomListComponent },
      { path: 'rooms/availability', component: RoomAvailabilityComponent },
      { path: 'rooms/create', component: RoomCreateComponent },
      { path: 'rooms/edit/:id', component: RoomEditComponent },
      { path: 'rooms/detail', component: RoomDetailComponent },
      { path: 'reservations', component: ReservationListComponent },
      { path: 'reservations/create', component: ReservationCreateComponent },
      { path: 'reservations/:id', component: ReservationDetailComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'register', component: UserRegisterComponent },

      { path: '', redirectTo: '/', pathMatch: 'full' }, // Redirigir a la página principal por defecto
      { path: '**', redirectTo: '/' }, // Redirigir cualquier ruta no encontrada a Home
    ]),
    RoleService,
    UserService,
    RoomService,
    UbicacionService,
    ReservationService,
    ReservationStatusService,
    ContactService,
    ReservationHistoryService,
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
