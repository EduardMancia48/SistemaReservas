import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../../service/room.service';
import { Room } from '../../../models/room.models';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room = {
    id: 0, name: '', capacity: 0,
    location: '',
    available: false
  }; // Inicializamos una sala vacía
  isEditMode = false; // Saber si estamos editando o creando

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.isEditMode = true;
      this.roomService.getRoom(+roomId).subscribe((data: Room) => {
        this.room = data;
      });
    }
  }

  saveRoom(): void {
    if (this.isEditMode) {
      this.roomService.updateRoom(this.room).subscribe(() => {
        console.log('Room updated successfully');
      });
    } else {
      this.roomService.createRoom(this.room).subscribe(() => {
        console.log('Room created successfully');
      });
    }
  }
}
