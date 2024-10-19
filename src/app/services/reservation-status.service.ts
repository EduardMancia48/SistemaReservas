import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationStatus } from '../models/reservation-status';

@Injectable({
  providedIn: 'root'
})
export class ReservationStatusService {
  private apiUrl = 'http://localhost:3000/api/reservation-statuses';

  constructor(private http: HttpClient) {}

  getReservationStatuses(): Observable<ReservationStatus[]> {
    return this.http.get<ReservationStatus[]>(this.apiUrl);
  }

  getReservationStatusById(id: number): Observable<ReservationStatus> {
    return this.http.get<ReservationStatus>(`${this.apiUrl}/${id}`);
  }

  createReservationStatus(status: ReservationStatus): Observable<ReservationStatus> {
    return this.http.post<ReservationStatus>(this.apiUrl, status);
  }

  updateReservationStatus(id: number, status: ReservationStatus): Observable<ReservationStatus> {
    return this.http.put<ReservationStatus>(`${this.apiUrl}/${id}`, status);
  }

  deleteReservationStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}