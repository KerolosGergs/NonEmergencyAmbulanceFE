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
  url =  Environment.apiUrl+'/Authentication';
  _ = inject(HttpClient);
   private tokenKey = 'authToken';
  private userKey = 'userInfo';
  private roleKey = 'userRole';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  setSession(token: string, Id: any, role: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, Id);
      localStorage.setItem(this.roleKey, role);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getUserId(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getRole(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.roleKey);
    }
    return null;
  }
  getId(): number {
    // if (this.isBrowser()) {
    //   const user = localStorage.getItem(this.userKey);
    //   return user ? JSON.parse(user) : null;
    // }
    // return null;
    return 1007;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  registerDriver(driver: DriverRegister):Observable<GenerialResponse<IUser>>{ 
    return this._.post<GenerialResponse<IUser>>(this.url + '/register/driver', driver);
  }
  registerNurse(driver: NurseRegister):Observable<GenerialResponse<IUser>>{
    return this._.post<GenerialResponse<IUser>>(this.url + '/register/nurse', driver);
  }
  registerPatient(Patient: PatientRegister):Observable<GenerialResponse<IUser>>{ 
    return this._.post<GenerialResponse<IUser>>(this.url + '/register/patient', Patient);
  }
  login(login: ILogin):Observable<GenerialResponse<any>>{ 
    return this._.post<GenerialResponse<any>>(this.url + '/login', login);
  }
  MyProfile():Observable<GenerialResponse<any>>{ 
    return this._.get<GenerialResponse<any>>(this.url + '/MyProfile');
  }
}