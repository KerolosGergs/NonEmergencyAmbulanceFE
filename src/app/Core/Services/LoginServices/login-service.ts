import { Environment } from './../../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
 _ = inject(HttpClient);
 
  login(FormGroup:FormGroup):Observable<any>{
    return this._.post<any>(Environment.apiUrl + '/login',FormGroup.value).pipe(
      map(res => {
        return res;
      })
    );
  }
}
