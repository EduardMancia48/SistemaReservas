import { Component, OnInit } from '@angular/core';
import { SalaService } from '../../../service/sala.service';
import { materialModules } from '../../../models/material-imports';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-room-availability',
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.css'],
  imports:[...materialModules, CommonModule]
})
export class RoomAvailabilityComponent implements OnInit {
  salas: any[] = [];

  constructor(private salaService: SalaService) {}

  ngOnInit(): void {
    this.salaService.getSalas().subscribe((data) => {
      this.salas = data;
    });
  }
}
