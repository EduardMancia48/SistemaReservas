import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from '../../app/models/room.models'; // Importa el modelo Room

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  // Datos simulados de las salas
  private rooms: Room[] = [
    { id: 1, name: 'Sala 101', location: 'Edificio A', capacity: 20, available: true },
    { id: 2, name: 'Sala 202', location: 'Edificio B', capacity: 15, available: false },
    { id: 3, name: 'Sala 303', location: 'Edificio C', capacity: 30, available: true }
  ];

  constructor() {}

  // Obtener todas las salas (simulado)
  getRooms(): Observable<Room[]> {
    return of(this.rooms); // Devuelve los datos simulados
  }

  // Obtener una sala por ID (simulado)
  getRoom(id: number): Observable<Room> {
    const room = this.rooms.find(r => r.id === id);
    return of(room!); // Devuelve la sala encontrada
  }

  // Crear una nueva sala (simulado)
  createRoom(room: Room): Observable<Room> {
    room.id = this.rooms.length + 1; // Asignamos un ID simulado
    this.rooms.push(room); // Añadimos la nueva sala
    return of(room); // Devolvemos la sala creada
  }

  // Actualizar una sala existente (simulado)
  updateRoom(room: Room): Observable<Room> {
    const index = this.rooms.findIndex(r => r.id === room.id);
    if (index !== -1) {
      this.rooms[index] = room; // Actualizamos la sala
    }
    return of(room); // Devolvemos la sala actualizada
  }

  // Eliminar una sala (simulado)
  deleteRoom(id: number): Observable<void> {
    this.rooms = this.rooms.filter(r => r.id !== id); // Filtramos las salas
    return of(); // Devolvemos un observable vacío
  }
}
