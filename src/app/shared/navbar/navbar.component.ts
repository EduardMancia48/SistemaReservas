import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../models/material-imports';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../interceptors/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ...materialModules, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}