import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    // Aquí puedes agregar la lógica para verificar si el usuario está autenticado
    // Por ejemplo, verificar un token en el almacenamiento local
    return !!localStorage.getItem('authToken');
  }
}