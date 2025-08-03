import { IRegisterResponse, IRequest } from './../../interface/register';
import { Environment } from './../../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../../interface/login';
import { ILogin } from '../../interface/IAuth/iauth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
 _ = inject(HttpClient);
 
  login(requesr:ILogin):Observable<LoginResponse>{
    return this._.post<any>(Environment.apiUrl + '/Authentication/login', requesr).pipe(
      map(res => {
        return res;
      })
    );
  }
 register(request: IRequest): Observable<IRegisterResponse> {
    return this._.post<IRegisterResponse>(
      `${Environment.apiUrl}/Authentication/register/patient`,
      request,
    ).pipe(
      map((res) => res)
    );
  }

}
