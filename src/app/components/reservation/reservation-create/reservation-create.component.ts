import { Component, Sanitizer } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { Reservation } from '../../../models/reservation';
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

  };
