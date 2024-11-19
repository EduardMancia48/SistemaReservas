import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../models/reservation';
import { materialModules } from '../../../models/material-imports';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, materialModules
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationCreateComponent {
  reservationForm: FormGroup;
  minDate: Date;
  minTime: string;

  dialogRef = inject(MatDialogRef<ReservationCreateComponent>);
  data = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);

  constructor() {
    this.minDate = new Date(); // Establecer la fecha mínima en la fecha actual
    this.minTime = this.getNextFullHour(); // Establecer la hora mínima en la siguiente hora completa
    this.reservationForm = this.fb.group({
      fecha_reserva: ['', Validators.required],
      hora_inicio: ['', [Validators.required, this.validateFullHour.bind(this)]],
      hora_fin: ['', [Validators.required, this.validateFullHour.bind(this)]]
    });
  }

  getNextFullHour(): string {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();

    if (minutes > 0) {
      hours += 1; // Avanzar a la siguiente hora completa si hay minutos en la hora actual
    }

    return `${hours.toString().padStart(2, '0')}:00`;
  }

  validateFullHour(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      if (minutes !== 0) {
        return { invalidTime: true };
      }
    }
    return null;
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

  onHoraInicioChange(): void {
    const horaInicio = this.reservationForm.get('hora_inicio')?.value;
    const [hours, minutes] = horaInicio.split(':').map(Number);
    const horaFinMin = new Date();
    horaFinMin.setHours(hours + 1, 0); // Establecer la hora de fin a la siguiente hora completa
    const minHoraFin = horaFinMin.toTimeString().slice(0, 5);
    this.reservationForm.get('hora_fin')?.setValue(minHoraFin);
  }
}