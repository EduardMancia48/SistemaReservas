import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private userRoleSubject: BehaviorSubject<number | null>;

  constructor() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token);
    this.userRoleSubject = new BehaviorSubject<number | null>(role ? parseInt(role, 10) : null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUserRole(): Observable<number | null> {
    return this.userRoleSubject.asObservable();
  }

  login(token: string, userId: number, role: number): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('userRole', role.toString());
    this.isLoggedInSubject.next(true);
    this.userRoleSubject.next(role);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}