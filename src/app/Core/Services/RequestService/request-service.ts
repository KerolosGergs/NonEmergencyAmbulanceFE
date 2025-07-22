import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRequestData } from '../../interface/irequest';
import { Environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly http = inject(HttpClient);

  /** Get all requests */
  getRequests(): Observable<IRequestData[]> {
    return this.http.get<IRequestData[]>(`${Environment.apiUrl}/Request`);
  }
}
