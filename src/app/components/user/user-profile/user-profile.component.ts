import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'; // Asegúrate de tener este servicio
import { User } from '../../../models/user';
import { materialModules } from '../../../models/material-imports';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [materialModules],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User |null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe((data: User) => {
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
