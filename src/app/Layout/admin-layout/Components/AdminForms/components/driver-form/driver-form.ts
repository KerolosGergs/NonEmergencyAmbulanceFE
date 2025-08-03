import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../.././../../../../Core/Services/AdminServices/admin-service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  FromResponse} from '../../../../../../Core/interface/FormsInterface';
import { AuthService } from '../../../../../../Core/Services/AuthServices/auth-service';
import { GenerialResponse } from '../../../../../../Core/interface/GenerialResponse/GenerialResponse';
import { IUser } from '../../../../../../Core/interface/IAuth/iauth';


@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './driver-form.html',
  styleUrl: './driver-form.css'
})
export class DriverFormComponent {
  ToastrService = inject(ToastrService);
 authService = inject(AuthService);
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
  this.authService.registerDriver(this.form.value).subscribe({
  next: (response: GenerialResponse<IUser>) => {
    if (response.success && response.data) {
      const user = response.data;

      // Validate essential fields before success
      if (user.FullName && user.Email) {
        this.ToastrService.success(`Driver ${user.FullName} created successfully!`, 'Success');
        this.form.reset({ isAvailable: true }); // Reset form with default value
      } else {
        this.ToastrService.error('Invalid driver data received from server.', 'Error');
      }
    } else {
      this.ToastrService.error(response.message || 'Driver registration failed.', 'Error');
    }
    this.isSubmitting = false;
  },
  error: (error) => {
    console.error('Error creating driver:', error);

    // Force response.data to null on error scenario
    const failedResponse: GenerialResponse<IUser> = {
      success: false,
      message: 'An unexpected error occurred.',
      data: null as any // Ensures data is null explicitly
    };

    this.ToastrService.error(failedResponse.message, 'Error');
    this.isSubmitting = false;
  }
});

  }
}