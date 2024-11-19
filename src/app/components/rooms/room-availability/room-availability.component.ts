import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { materialModules } from '../../../models/material-imports';
import { CommonModule } from '@angular/common';
import { Room } from '../../../models/room';

@Component({
    selector: 'app-room-availability',
    templateUrl: './room-availability.component.html',
    styleUrls: ['./room-availability.component.css'],
    imports: [...materialModules, CommonModule]
})
export class RoomAvailabilityComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe((data: Room[]) => {
      this.rooms = data;
    });
  }
}
