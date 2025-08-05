import { register } from './../../interface/register';
import { Environment } from './../../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { DriverRegister, ILogin, IUser, NurseRegister, PatientRegister } from '../../interface/IAuth/iauth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = Environment.apiUrl + '/Authentication';
  private _ = inject(HttpClient);

  private sessionKey = 'userSession'; // New key for storing full session object

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }



  // New: Set Full User Session
  setUserSession(IUser: {
    userId: string,
    profileId: number,
    fullName: string,
    email: string,
    token: string,
    displayName: string,
    role: string
  }): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.sessionKey, JSON.stringify(IUser));
    }
  }

  // Get Full User Session
  private getSessionData(): any | null {
    if (this.isBrowser()) {
      const session = localStorage.getItem(this.sessionKey);
      return session ? JSON.parse(session) : null;
    }
    return null;
  }
  // Existing Get Token
  getUserId(): string | null {
    const session = this.getSessionData();
    return session?.userId || null;
  }

  getProfileId(): number | null {
    const session = this.getSessionData();
    return session?.profileId || null;
  }

  getFullName(): string | null {
    const session = this.getSessionData();
    return session?.fullName || null;
  }

  getEmail(): string | null {
    const session = this.getSessionData();
    return session?.email || null;
  }

  getToken(): string | null {
    const session = this.getSessionData();
    return session?.token || null;
  }

  getDisplayName(): string | null {
    const session = this.getSessionData();
    return session?.displayName || null;
  }

  getRole(): string | null {
    const session = this.getSessionData();
    return session?.role || null;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  registerDriver(driver: FormData): Observable<GenerialResponse<IUser>> {
    return this._.post<GenerialResponse<IUser>>(this.url + '/register/driver', driver);
  }


  registerNurse(nurse: FormData): Observable<GenerialResponse<IUser>> {
    return this._.post<GenerialResponse<IUser>>(this.url + '/register/nurse', nurse);
  }
  registerPatient(Patient: PatientRegister): Observable<GenerialResponse<IUser>> {
    return this._.post<GenerialResponse<IUser>>(this.url + '/register/patient', Patient);
  }
  login(login: ILogin): Observable<GenerialResponse<any>> {
    return this._.post<GenerialResponse<any>>(this.url + '/login', login);
  }
  MyProfile(): Observable<GenerialResponse<any>> {
    return this._.get<GenerialResponse<any>>(this.url + '/MyProfile');
  }
}