import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../../../Core/Services/AdminServices/admin-service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FromResponse } from '../../../../Core/interface/FormsInterface';

@Component({
  selector: 'app-nurse-form',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './nurse-form.html',
  styleUrl: './nurse-form.css'
})
export class NurseFormComponent {
 form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
        ],
      ],
      phoneNumber: ['', Validators.required],
      certification: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.adminService.addNurse(this.form.value).subscribe({
      next: (response: FromResponse) => {
        if (response.fullName && response.email) {
          this.toastr.success(`Nurse ${response.fullName} created successfully!`, 'Success');
          this.form.reset();
        } else {
          this.toastr.error('Invalid response from server.', 'Error');
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error creating nurse:', error);
        this.toastr.error('Error creating nurse account. Please try again.', 'Error');
        this.isSubmitting = false;
      },
    });
  }
}