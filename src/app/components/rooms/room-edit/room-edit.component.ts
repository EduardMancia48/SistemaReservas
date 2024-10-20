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
      disponible: [true]
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la sala desde la URL
    this.roomId = +this.route.snapshot.paramMap.get('id')!;
    
    // Cargar los datos de la sala en el formulario
    this.roomService.getRoomById(this.roomId).subscribe((room: Room) => {
      this.roomForm.patchValue(room);
    }, error => {
      console.error('Error al obtener los datos de la sala:', error);
      // Manejar el error, por ejemplo, redirigir a una página de error o mostrar un mensaje
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      // Enviar los datos actualizados al servidor
      this.roomService.updateRoom(this.roomId, this.roomForm.value).subscribe(() => {
        // Redirigir a la lista de salas después de la actualización
        this.router.navigate(['/rooms']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }
}