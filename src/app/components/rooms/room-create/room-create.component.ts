import { Component, OnInit } from '@angular/core';
import { materialModules } from '../../../models/material-imports';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-create',
  standalone: true,
  imports: [materialModules],
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css'
})
export class RoomCreateComponent implements OnInit {

  roomForm: FormGroup;



  constructor(private fb: FormBuilder) {}



  ngOnInit(): void {

    this.roomForm = this.fb.group({

      name: ['', Validators.required],

      capacity: ['', [Validators.required, Validators.min(1)]],

      location: ['', Validators.required],

      price: ['', [Validators.required, Validators.min(0)]]

    });

  }



  onSubmit(): void {

    if (this.roomForm.valid) {

      // Handle form submission

    }

  }



  onCancel(): void {

    // Handle cancel action

  }
}