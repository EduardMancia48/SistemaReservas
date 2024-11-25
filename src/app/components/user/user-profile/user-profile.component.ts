import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'; // Asegúrate de tener este servicio
import { User } from '../../../models/user';
import { materialModules } from '../../../models/material-imports';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../interceptors/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
    selector: 'app-user-profile',
    imports: [materialModules, CommonModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe((userId: number | null) => {
      if (userId !== null) {
        this.loadUserProfile(userId);
      } else {
        console.error('No se pudo obtener el ID del usuario logueado');
      }
    });
  }

  loadUserProfile(id: number): void {
    this.userService.getUserProfile(id).subscribe((data: User) => {
      this.user = data;
    }, error => {
      console.error('Error al obtener el perfil del usuario', error);
    });
  }

  editProfile(): void {
    // Lógica para editar el perfil del usuario
    console.log('Editar perfil');
  }

  changePassword(): void {
    // Lógica para cambiar la contraseña
    console.log('Cambiar contraseña');
  }
}