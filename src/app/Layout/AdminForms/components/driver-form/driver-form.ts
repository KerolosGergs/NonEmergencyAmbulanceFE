import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../../../Core/Services/AdminServices/admin-service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  FromResponse} from '../../../../Core/interface/FormsInterface';


@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './driver-form.html',
  styleUrl: './driver-form.css'
})
export class DriverFormComponent {
  ToastrService = inject(ToastrService);
  adminService = inject(AdminService);
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
    ]],
    phoneNumber: ['', Validators.required],
    licenseNumber: ['', Validators.required],
    isAvailable: [true]
  });

  isSubmitting = false;
  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.adminService.addDriver(this.form.value).subscribe({
      next: (res) => {
        this.ToastrService.success(`Driver ${res.fullName} created successfully!`, 'Success');
        this.form.reset({ isAvailable: true });
        this.isSubmitting = false;
      },
      error: () => {
        this.ToastrService.error('Error creating driver account. Please try again.', 'Error');
        this.isSubmitting = false;
      }
    });
  }
}