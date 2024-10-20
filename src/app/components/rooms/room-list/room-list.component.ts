import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { materialModules } from '../../../models/material-imports';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, ...materialModules],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  displayedColumns: string[] = ['sala_id', 'nombre', 'capacidad', 'ubicacion', 'precio', 'disponible'];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource<Room>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe((data: Room[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}