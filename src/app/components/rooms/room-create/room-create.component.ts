import { Component, OnInit } from '@angular/core';
import { materialModules } from '../../../models/material-imports';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-room-create',
  standalone: true,
  imports: [...materialModules],
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css'
})
export class RoomCreateComponent implements OnInit {
  roomForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      nombre: ['', Validators.required], // Cambiar name a nombre
      capacidad: ['', [Validators.required, Validators.min(1)]],
      ubicacion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      disponible: [true] // Agregar el campo disponible al formulario
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.roomForm.valid) {
      console.log(this.roomForm.value); // Verificar los datos antes de enviarlos
      this.roomService.createRoom(this.roomForm.value).subscribe(() => {
        this.router.navigate(['/rooms']);
      }, error => {
        console.error('Error al crear la sala:', error);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/rooms']);
  }
}