export interface Reservation {
    id: number;
    userId: number;
    roomId: number;
    startTime: Date;
    endTime: Date;
    status: 'pending' | 'confirmed' | 'cancelled';
  }
  