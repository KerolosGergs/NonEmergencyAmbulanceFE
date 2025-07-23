import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITripData } from '../../interface/itrip-data';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Trip {
  _ = inject(HttpClient);


}
