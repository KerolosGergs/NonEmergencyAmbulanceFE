import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../../Core/Services/AuthServices/auth-service';
import { GenerialResponse } from '../../../../../../Core/interface/GenerialResponse/GenerialResponse';
import { IUser } from '../../../../../../Core/interface/IAuth/iauth';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './driver-form.html',
  styleUrl: './driver-form.css'
})
export class DriverFormComponent {
  ToastrService = inject(ToastrService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  showPassword = false;
  showConfirmPassword = false;

  imageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageError: string = '';

  isSubmitting = false;

  form: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
    ]],
    confirmPassword: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    licenseNumber: ['', Validators.required],
    isAvailable: [true]
  }, { validators: this.passwordMatchValidator });

  get f() { return this.form.controls; }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      const errors = control.get('confirmPassword')?.errors;
      if (errors) {
        delete errors['mismatch'];
        if (Object.keys(errors).length === 0) {
          control.get('confirmPassword')?.setErrors(null);
        }
      }
    }
    return null;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.imageError = '';

    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Only image files are allowed.';
        return;
      }

      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.imageFile) {
      this.imageError = 'Profile picture is required.';
      return;
    }

    const formData = new FormData();
    formData.append('FullName', this.form.value.fullName);
    formData.append('Email', this.form.value.email);
    formData.append('Password', this.form.value.password);
    formData.append('PhoneNumber', this.form.value.phoneNumber);
    formData.append('LicenseNumber', this.form.value.licenseNumber);
    formData.append('IsAvailable', this.form.value.isAvailable);
    formData.append('Image', this.imageFile);

    this.isSubmitting = true;

    this.authService.registerDriver(formData).subscribe({
      next: (response: GenerialResponse<IUser>) => {
        debugger
        if (response.success && response.data) {
          const user = response.data;
          if (user.fullName && user.email) {
            this.ToastrService.success(`Driver ${user.fullName} created successfully!`, 'Success');
            this.form.reset({ isAvailable: true });
            this.imageFile = null;
            this.imagePreview = null;
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
        this.ToastrService.error('An unexpected error occurred.', 'Error');
        this.isSubmitting = false;
      }
    });
  }
}
