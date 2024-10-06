import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../models/material-imports';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ...materialModules],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { }