import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../models/material-imports';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../interceptors/auth.service';

@Component({
  standalone: true,
    selector: 'app-navbar',
    imports: [CommonModule, ...materialModules, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: number | null = null;
  isDesktop: boolean = window.innerWidth > 600;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isDesktop = window.innerWidth > 600;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}