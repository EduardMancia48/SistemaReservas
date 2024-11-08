import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../../models/material-imports';

@Component({
  selector: 'app-room-edit',
  standalone: true,
  imports: [CommonModule, ...materialModules],
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  roomForm: FormGroup;
  roomId: number = 0;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roomForm = this.fb.group({
      nombre: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(1)]],
      ubicacion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      disponible: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = +params.get('id')!;
      if (this.roomId) {
        this.loadRoom();
      } else {
        console.error('No se pudo obtener el ID de la sala');
      }
    });
  }

  loadRoom(): void {
    this.roomService.getRoomById(this.roomId).subscribe((room: Room) => {
      this.roomForm.patchValue(room);
    }, error => {
      console.error('Error al obtener los datos de la sala:', error);
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.roomService.updateRoom(this.roomId, this.roomForm.value).subscribe(() => {
        this.router.navigate(['/rooms']);
      }, error => {
        console.error('Error al actualizar la sala:', error);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }
}