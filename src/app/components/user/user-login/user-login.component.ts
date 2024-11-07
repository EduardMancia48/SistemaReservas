import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { materialModules } from '../../../models/material-imports';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [materialModules, CommonModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.userService.login(loginData).subscribe(() => {
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/']); // Redirigir a la página de inicio
      }, error => {
        console.error('Error al iniciar sesión', error);
        this.snackBar.open('Error al iniciar sesión', 'Cerrar', {
          duration: 3000,
        });
      });
    }
  }
}