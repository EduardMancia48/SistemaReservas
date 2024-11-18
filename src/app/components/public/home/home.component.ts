import { Component, ElementRef, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { materialModules } from '../../../models/material-imports';
import { CommonModule } from '@angular/common';
import { Room } from '../../../models/room';
import { RoomService } from '../../../services/room.service';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule,...materialModules],
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

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      this.availableRooms = rooms.filter(room => room.disponible);
      this.loop = this.availableRooms.length >= 2;
    });
  }
}