import { Component, Inject, ViewChild } from '@angular/core';
import { materialModules } from '../../../models/material-imports';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../../../models/room';
import { MatSort } from '@angular/material/sort';
import { RoomService } from '../../../services/room.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-room-detail-dialog',
  standalone: true,
  imports: [CommonModule, ...materialModules, RouterModule],
  templateUrl: './room-detail-dialog.component.html',
  styleUrl: './room-detail-dialog.component.css'
})
export class RoomDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { room: any }) {}

  
}
