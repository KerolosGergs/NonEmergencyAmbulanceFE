import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../Core/Services/AuthServices/auth-service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav implements OnInit{
  private auth = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = false;
  role: string | null = null;
  displayName: string | null = null;

  private sub?: Subscription;

  ngOnInit(): void {
    // initialize from current session
    this.hydrateFromService();

    // react to future changes (login/logout)
    this.sub = this.auth.sessionChanges$.subscribe(() => this.hydrateFromService());
  }

  private hydrateFromService(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.role = this.auth.getRole();
    this.displayName = this.auth.getDisplayName() ?? this.auth.getFullName();
  }

  onLogout(): void {
    this.auth.logout();
    // optional: navigate to home after logout
    this.router.navigateByUrl('/');
  }

  // convenience getters for role-based UI
  get isPatient() { return this.role === 'Patient'; }
  get isDriver()  { return this.role === 'Driver'; }
  get isNurse()   { return this.role === 'Nurse'; }
  get isAdmin()   { return this.role === 'Admin'; }
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}