import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../../../../../Core/Services/AdminServices/admin-service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FromResponse } from '../../../../../../Core/interface/FormsInterface';
import { AuthService } from '../../../../../../Core/Services/AuthServices/auth-service';
import { GenerialResponse } from '../../../../../../Core/interface/GenerialResponse/GenerialResponse';
import { IUser } from '../../../../../../Core/interface/IAuth/iauth';

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
    private authService: AuthService
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

    this.authService.registerNurse(this.form.value).subscribe({
  next: (response: GenerialResponse<IUser>) => {
    if (response.success && response.data) {
      const user = response.data;

      // Validate the required fields are not null or empty
      if (user.FullName && user.Email) {
        this.toastr.success(`Nurse ${user.FullName} created successfully!`, 'Success');
        this.form.reset();
      } else {
        this.toastr.error('Invalid user data received from server.', 'Error');
      }
    } else {
      this.toastr.error(response.message || 'Registration failed.', 'Error');
    }
    this.isSubmitting = false;
  },
  error: (error) => {
    console.error('Error creating nurse:', error);

    // Force response.data to be null on error case
    const failedResponse: GenerialResponse<IUser> = {
      success: false,
      message: 'An unexpected error occurred.',
      data: null as any // Ensures data is null explicitly
    };

    this.toastr.error(failedResponse.message, 'Error');
    this.isSubmitting = false;
  }
});

  }
}