import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../../models/material-imports';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, ...materialModules, ],  // Importa CommonModule para usar directivas como *ngFor
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
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