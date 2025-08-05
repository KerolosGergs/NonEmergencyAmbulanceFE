import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../../Core/Services/LoginServices/login-service';
import { IRegisterResponse, IRequest } from './../../../../Core/interface/register';

@Component({
  selector: 'app-register-layout',
  imports: [ReactiveFormsModule],
  templateUrl: './register-layout.html',
  styleUrl: './register-layout.scss'
})
export class RegisterLayout implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;

  showPassword = false;
  showConfirmPassword = false;

  imageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageError = '';

  Login = inject(LoginService);
  toastr = inject(ToastrService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      medicalHistory: ['', [Validators.maxLength(1000)]]
    }, { validators: this.passwordMatchValidator });
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

  private dateOfBirthValidator(control: any) {
    if (!control.value) return null;

    const selectedDate = new Date(control.value);
    const today = new Date();
    const minAge = 18;
    const maxAge = 120;

    let age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
      age--;
    }

    if (age < minAge) return { minAge: true };
    if (age > maxAge) return { maxAge: true };
    if (selectedDate > today) return { futureDate: true };

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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      this.toastr.error('يرجى تصحيح الأخطاء في النموذج');
      return;
    }

    if (!this.imageFile) {
      this.imageError = 'Profile picture is required.';
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('FullName', this.registerForm.get('fullName')?.value);
    formData.append('Email', this.registerForm.get('email')?.value);
    formData.append('Password', this.registerForm.get('password')?.value);
    formData.append('PhoneNumber', this.registerForm.get('phoneNumber')?.value);
    formData.append('DateOfBirth', this.registerForm.get('dateOfBirth')?.value);
    formData.append('Gender', this.registerForm.get('gender')?.value);
    formData.append('Address', this.registerForm.get('address')?.value);
    formData.append('MedicalHistory', this.registerForm.get('medicalHistory')?.value || '');
    formData.append('Image', this.imageFile);

    this.Login.register(formData).subscribe({
      next: (res: IRegisterResponse) => {
        if(!res.success){
          this.toastr.success(res.message, 'Success');
          this.router.navigate(['/login']);
          
        }else{
          this.toastr.error(res.message, 'Error');
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        // console.error('Registration error:', err);
        this.toastr.error(err.error.message, 'Error');
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} is required.`;
      if (field.errors['email']) return 'Please enter a valid email address.';
      if (field.errors['minlength']) return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters.`;
      if (field.errors['maxlength']) return `${this.getFieldDisplayName(fieldName)} cannot exceed ${field.errors['maxlength'].requiredLength} characters.`;
      if (field.errors['pattern']) return 'Please enter a valid phone number.';
      if (field.errors['minAge']) return 'You must be at least 18 years old.';
      if (field.errors['maxAge']) return 'Please enter a valid date of birth.';
      if (field.errors['futureDate']) return 'Date of birth cannot be in the future.';
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      fullName: 'Full name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      phoneNumber: 'Phone number',
      dateOfBirth: 'Date of birth',
      gender: 'Gender',
      address: 'Address',
      medicalHistory: 'Medical history'
    };
    return displayNames[fieldName] || fieldName;
  }
}
