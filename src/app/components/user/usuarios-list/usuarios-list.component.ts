import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; // Importa el módulo de tablas
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-usuarios-list',
  imports: [CommonModule, MatTableModule, MatCardModule], // Asegúrate de incluir MatTableModule
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  usuarios: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.usuarios = data; // Carga la lista de usuarios
        console.log('Usuarios cargados:', this.usuarios);
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }
}
