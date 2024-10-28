import { Component, ViewChild } from '@angular/core';
import { materialModules } from '../../../models/material-imports';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../../../models/room';
import { MatSort } from '@angular/material/sort';
import { RoomService } from '../../../services/room.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule, ...materialModules, RouterModule],
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent {
  displayedColumns: string[] = ['sala_id', 'nombre', 'capacidad', 'ubicacion', 'precio', 'disponible', 'acciones', 'img'];
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

  deleteRoom(id: number): void {
    this.roomService.deleteRoom(id).subscribe(() => {
      this.getRooms(); // Refresh the list after deletion
    });
  }
}
