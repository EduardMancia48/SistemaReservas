export interface Reservation {
    reserva_id: number;
    usuario_id: number;
    sala_id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado_reserva_id: number;
  }