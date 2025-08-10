import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../Core/Services/AuthServices/auth-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoggedIn = false;
  userName = '';
  userImage = '';
  userRole = '';

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      // Type assertions to fix "Object is of type 'unknown'" errors
      this.userName = (this.authService.getFullName?.() as string) || 'User';
      this.userRole = (this.authService.getRole?.() as string) || 'User';
      // You can set a default image or get from user profile
      this.userImage = 'assets/images/default-avatar.png';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
