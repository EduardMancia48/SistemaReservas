import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'; // Asegúrate de tener este servicio
import { materialModules } from '../../../models/material-imports';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [materialModules],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Aquí se almacenarán los datos del usuario

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Simula la carga de datos del usuario
    this.user = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      rol: 'Cliente'
    };

    // En un entorno real, puedes usar el servicio para obtener los datos del usuario
    // this.userService.getUserProfile().subscribe(data => {
    //   this.user = data;
    // });
  }

  editProfile() {
    // Lógica para editar el perfil
    console.log('Editar perfil');
  }

  changePassword() {
    // Lógica para cambiar la contraseña
    console.log('Cambiar contraseña');
  }
}
