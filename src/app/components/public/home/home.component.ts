import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';
import { materialModules } from '../../../models/material-imports';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ReservationCreateComponent } from '../../reservation/reservation-create/reservation-create.component';

register();

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [CommonModule, MatDialogModule, ...materialModules],
    styleUrls: ['./home.component.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  rooms: Room[] = [];
  availableRooms: Room[] = [];
  loop: boolean = true;
  breakpoints = {
    0: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  };

  constructor(private roomService: RoomService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe({
      next: (rooms: Room[]) => {
        this.rooms = rooms;
        this.availableRooms = rooms.filter(room => room.disponible);
        this.loop = this.availableRooms.length >= 2;
      },
      error: (err) => {
        console.error('Error fetching rooms:', err);
      }
    });
  }

  openReservationDialog(room: Room): void {
    this.dialog.open(ReservationCreateComponent, {
      width: 'auto',
      data: { room }
    });
  }
}