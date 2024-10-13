import { Component } from '@angular/core';
import { materialModules } from '../../../models/material-imports';


@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [materialModules],
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent {

}
