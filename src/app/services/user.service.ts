import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://flowery-caterwauling-echium.glitch.me';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los usuarios con rol_id = 1.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios/user`);
  }

  /**
   * Obtiene todos los administradores con rol_id = 2.
   */
  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/usuarios/admins`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/usuarios/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/usuarios`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/usuarios/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }

  getUserProfile(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/${id}`);
  }

  login(loginData: { email: string, password: string }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, loginData);
  }

  getUserId(): Observable<number | null> {
    const userId = localStorage.getItem('userId');
    return of(userId ? parseInt(userId, 10) : null);
  }
}
