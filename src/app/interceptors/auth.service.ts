import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor() {
    const token = localStorage.getItem('authToken');
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  login(token: string, userId: number): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId.toString());
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    this.isLoggedInSubject.next(false);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}