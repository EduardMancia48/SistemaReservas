import { Component } from '@angular/core';
import { materialModules } from '../../models/material-imports';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [materialModules],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
