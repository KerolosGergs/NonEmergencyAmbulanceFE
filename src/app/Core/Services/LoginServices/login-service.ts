import { IRegisterResponse, IRequest } from './../../interface/register';
import { Environment } from './../../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../../interface/login';
import { ILogin, IUser } from '../../interface/IAuth/iauth';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
 _ = inject(HttpClient);
 
  login(requesr:ILogin):Observable<GenerialResponse<IUser>>{
    return this._.post<any>(Environment.apiUrl + '/Authentication/login', requesr).pipe(
      map(res => {
        return res;
      })
    );
  }
 register(request: FormData): Observable<GenerialResponse<IUser>> {
    return this._.post<GenerialResponse<IUser>>(
      `${Environment.apiUrl}/Authentication/register/patient`,
      request,
    ).pipe(
      map((res) => res)
    );
  }

}
