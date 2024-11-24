import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../models/reservation';
import { materialModules } from '../../../models/material-imports';
import moment from 'moment-timezone';
import { ReservationService } from '../../../services/reservation.service';
import { ReservationHistoryService } from '../../../services/reservation-history.service';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, materialModules],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationCreateComponent implements OnInit {
  reservationForm: FormGroup;
  minDate: Date;
  minTime: string;
  availableTimes: string[] = [];
  availableEndTimes: string[] = [];

  dialogRef = inject(MatDialogRef<ReservationCreateComponent>);
  data = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);
  reservationService = inject(ReservationService);

  constructor() {
    this.minDate = new Date(); // Establecer la fecha mínima en la fecha actual
    this.minTime = this.getNextFullHour(); // Establecer la hora mínima en la siguiente hora completa
    this.reservationForm = this.fb.group({
      fecha_reserva: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateAvailableTimes();
  }

  getNextFullHour(): string {
    const now = moment().tz('America/El_Salvador');
    let hours = now.hours();
    const minutes = now.minutes();

    if (minutes > 0) {
      hours += 1; // Avanzar a la siguiente hora completa si hay minutos en la hora actual
    }

    return `${hours.toString().padStart(2, '0')}:00`;
  }

  updateAvailableTimes(): void {
    const now = moment().tz('America/El_Salvador');
    const selectedDate = moment(this.reservationForm.get('fecha_reserva')?.value).tz('America/El_Salvador');
    const startHour = selectedDate.isSame(now, 'day') ? Math.max(8, now.hours() + 1) : 8;
    this.availableTimes = [];

    for (let hour = startHour; hour <= 22; hour++) {
      this.availableTimes.push(moment({ hour }).format('hh:mm A'));
    }
  }

  updateAvailableEndTimes(): void {
    const startTime = this.reservationForm.get('hora_inicio')?.value;
    const [startHour, startMinute] = moment(startTime, 'hh:mm A').format('HH:mm').split(':').map(Number);
    this.availableEndTimes = [];

    for (let hour = startHour + 1; hour <= 22; hour++) {
      this.availableEndTimes.push(moment({ hour }).format('hh:mm A'));
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const fecha_reserva = moment(this.reservationForm.value.fecha_reserva).format('YYYY-MM-DD');
      const hora_inicio = moment(this.reservationForm.value.hora_inicio, 'hh:mm A').format('HH:mm:ss');
      const hora_fin = moment(this.reservationForm.value.hora_fin, 'hh:mm A').format('HH:mm:ss');

      const reservation: Reservation = {
        reserva_id: 0, // Este valor se generará en el backend
        usuario_id: 1, // Este valor debe ser el ID del usuario logueado
        sala_id: this.data.room.sala_id,
        fecha_reserva: fecha_reserva,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        estado_reserva_id: 1 // Estado inicial de la reserva
      };

      console.log('Datos de la reserva:', reservation); // Agregar este log para verificar los datos

      this.reservationService.createReservation(reservation).subscribe(
        (response) => {
          console.log('Reserva y historial creados:', response); // Verificar que el ID de la reserva se obtenga correctamente
          this.reservationService.scheduleReservationStatusUpdate(response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error al crear la reserva:', error); // Agregar este log para verificar el error
        }
      );
    }
  }

  onFechaReservaChange(): void {
    this.updateAvailableTimes();
    this.reservationForm.get('hora_inicio')?.setValue('');
    this.reservationForm.get('hora_fin')?.setValue('');
  }

  onHoraInicioChange(): void {
    this.updateAvailableEndTimes();
    this.reservationForm.get('hora_fin')?.setValue('');
  }
}