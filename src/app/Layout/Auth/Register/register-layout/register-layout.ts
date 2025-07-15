import { IRegisterResponse, IRequest } from './../../../../Core/interface/register';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../../Core/Services/LoginServices/login-service';
import { error } from 'console';

@Component({
  selector: 'app-register-layout',
  imports: [ReactiveFormsModule],
  templateUrl: './register-layout.html',
  styleUrl: './register-layout.scss'
})
export class RegisterLayout implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;

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
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      dateOfBirth: ['', [Validators.required, this.dateOfBirthValidator]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      medicalHistory: ['', [Validators.maxLength(1000)]]
    });
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

    if (age < minAge) {
      return { minAge: true };
    }

    if (age > maxAge) {
      return { maxAge: true };
    }

    if (selectedDate > today) {
      return { futureDate: true };
    }

    return null;
  }

onSubmit(): void {
  debugger
    if (this.registerForm.valid) {
      this.isLoading = true;
      
      const request: IRequest = {
        email:this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        fullName: this.registerForm.get('fullName')?.value  ,
        phoneNumber: this.registerForm.get('phoneNumber')?.value,
        address: this.registerForm.get('address')?.value,
        medicalHistory: this.registerForm.get('medicalHistory')?.value,
        gender: Number( this.registerForm.get('gender')?.value),
        dateOfBirth: this.registerForm.get('dateOfBirth')?.value
      }

      this.Login.register(request).subscribe({
        next: (res: IRegisterResponse) => {
          this.isLoading = false;
          if (res?.success) {
            this.toastr.success('تم إنشاء الحساب بنجاح');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error(res?.message ?? 'فشل في إنشاء الحساب، حاول مرة أخرى');
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Registration error:', err);
          this.toastr.error('حدث خطأ أثناء تسجيل الدخول. تحقق من اتصالك بالإنترنت.');
        }
      });

    } else {
      this.markFormGroupTouched();
      this.toastr.error('يرجى تصحيح الأخطاء في النموذج');
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
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
      phoneNumber: 'Phone number',
      dateOfBirth: 'Date of birth',
      gender: 'Gender',
      address: 'Address',
      medicalHistory: 'Medical history'
    };
    return displayNames[fieldName] || fieldName;
  }
}
