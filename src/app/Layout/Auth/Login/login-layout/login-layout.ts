import { AuthService } from './../../../../Core/Services/AuthServices/auth-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../../Core/Services/LoginServices/login-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILogin, ILoginResponse } from '../../../../Core/interface/login';

@Component({
  selector: 'app-login-layout',
  imports: [ReactiveFormsModule],
  templateUrl: './login-layout.html',
  styleUrl: './login-layout.scss',
})
export class LoginLayout {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  Login = inject(LoginService);
  toastr = inject(ToastrService);
  AuthService = inject(AuthService);

  showPassword: boolean = false;
  rememberMe: boolean = false;
  isLoading: boolean = false;
  constructor(private router: Router) {
  }
  onSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {

      this.Login.login(this.loginForm.value).subscribe({

        next: (res: ILoginResponse) => {
          if (res.success) {
            this.AuthService.setSession(res.data.token, res.data, res.data.role);

            this.router.navigate(['/home']);

            this.toastr.success('تم تسجيل الدخول بنجاح');
          } else {
            this.toastr.error('البريد الالكتروني او كلمة المرور غير صحيح');
          }

          this.isLoading = false;
        },

        error: (error) => {
          debugger
          this.toastr.error(' حدث خطاء اثناء تسجيل الدخول تحقق من اتصالك بالانترنت');
          this.isLoading = false;
        }
      });

    } else {
      // this.toastr.error('يرجى ملء جميع الحقول');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

}
