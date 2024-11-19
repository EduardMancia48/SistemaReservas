import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../../models/material-imports';
import { Reservation } from '../../../models/reservation';

@Component({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, ...materialModules],
    providers: [
        provideNativeDateAdapter()
    ],
    selector: 'app-reservation-create',
    templateUrl: './reservation-create.component.html',
    styleUrls: ['./reservation-create.component.css']
})
export class ReservationCreateComponent {
  reservationForm: FormGroup;
  minDate: Date;

  constructor(
    public dialogRef: MatDialogRef<ReservationCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.minDate = new Date(); // Establecer la fecha mínima en la fecha actual
    this.reservationForm = this.fb.group({
      fecha_reserva: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const reservation: Reservation = {
        reserva_id: 0, // Este valor se generará en el backend
        usuario_id: 1, // Este valor debe ser el ID del usuario logueado
        sala_id: this.data.room.sala_id,
        fecha_reserva: this.reservationForm.value.fecha_reserva,
        hora_inicio: this.reservationForm.value.hora_inicio,
        hora_fin: this.reservationForm.value.hora_fin,
        estado_reserva_id: 1 // Estado inicial de la reserva
      };
      // Aquí puedes enviar la reserva al backend
      console.log('Reserva creada:', reservation);
      this.dialogRef.close(reservation);
    }
  }
}