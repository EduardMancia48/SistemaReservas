import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../../models/material-imports';
import { SalaService } from '../../../service/sala.service';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, ...materialModules, ],  // Importa CommonModule para usar directivas como *ngFor
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  salas: any[] = [];

  constructor(private salaService: SalaService) {}

  ngOnInit(): void {
    this.salaService.getSalas().subscribe((data) => {
      this.salas = data;
    });
  }
}