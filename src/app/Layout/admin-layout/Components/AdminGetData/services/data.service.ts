import { inject, Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Nurse, Driver, Ambulance, Patient, AmbulanceStatus, AmbulanceType, Gender } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  _ = inject(HttpClient);

  getAllNurses(): Observable<Nurse[]> {
    return this._.get<Nurse[]>(Environment.apiUrl + '/Admin/nurses');
  }
  getAllDrivers(): Observable<Driver[]> {
    return this._.get<Driver[]>(Environment.apiUrl + '/Admin/drivers');
  }
  getAllAmbulances(): Observable<Ambulance[]> {
    return this._.get<Ambulance[]>(Environment.apiUrl + '/Admin/ambulances');
  }
  getAllPatients(): Observable<Patient[]> {
    return this._.get<Patient[]>(Environment.apiUrl + '/Admin/patients');
  }


  constructor() { }

  // Nurse operations
  getNurses(): Observable<Nurse[]> {
    return this._.get<Nurse[]>(Environment.apiUrl + '/Admin/nurses');
  }

  updateNurseAvailability(id: number, isAvailable: boolean): Observable<{
    "isSuccessful": boolean,
    "data": string
  }> {

    return this._.patch<{
      "isSuccessful": boolean,
      "data": string
    }>(Environment.apiUrl + `/Nurse/${id}/toggle-availability`, { isAvailable });

    // return of(false).pipe(delay(300));
  }

  deleteNurse(id: number): Observable<any> {
   return this._.delete(Environment.apiUrl + `/Nurse/${id}`);
    // return of(false).pipe(delay(300));
  }

  // Driver operations
  getDrivers(): Observable<Driver[]> {
    return this._.get<Driver[]>(Environment.apiUrl + '/Admin/drivers');
  }

  updateDriverAvailability(id: number, isAvailable: boolean):Observable<{
    "isSuccessful": boolean,
    "data": string
  }> {

    return this._.patch<{
      "isSuccessful": boolean,
      "data": string
    }>(Environment.apiUrl + `/Driver/${id}/toggle-availability`,  isAvailable );

    // return of(false).pipe(delay(300));
  }
  deleteDriver(id: number): Observable<boolean> {
    // const index = this.drivers.findIndex(d => d.id === id);
    // if (index > -1) {
    //   this.drivers.splice(index, 1);
    //   return of(true).pipe(delay(300));
    // }
   return this._.delete<boolean>(Environment.apiUrl + `/Driver/${id}`);
  }

  // Ambulance operations
  getAmbulances(): Observable<Ambulance[]> {
    return this._.get<Ambulance[]>(Environment.apiUrl + '/Admin/ambulances');
  }

  updateAmbulanceStatus(plateNumber: string, status: AmbulanceStatus): Observable<boolean> {
    // const ambulance = this.ambulances.find(a => a.plateNumber === plateNumber);
    // if (ambulance) {
    //   ambulance.status = status;
    //   return of(true).pipe(delay(300));
    // }
    return of(false).pipe(delay(300));
  }

  deleteAmbulance(id: number): Observable<boolean> {
    // const index = this.ambulances.findIndex(a => a.plateNumber === plateNumber);
    // if (index > -1) {
    //   this.ambulances.splice(index, 1);
    //   return of(true).pipe(delay(300));
    // }
       return this._.delete<boolean>(Environment.apiUrl + `/ambulances/${id}`);

    // return of(false).pipe(delay(300));
  }

  // Patient operations
  getPatients(): Observable<Patient[]> {
    return this._.get<Patient[]>(Environment.apiUrl + '/Admin/patients');
  }

  deletePatient(id: number): Observable<boolean> {
    // const index = this.patients.findIndex(p => p.id === id);
    // if (index > -1) {
    //   this.patients.splice(index, 1);
    //   return of(true).pipe(delay(300));
    // }
    // return of(false).pipe(delay(300));
    return of(true);
  }

  // Get driver name by ID (for ambulance table)
  getDriverName(driverId: number): string {
    //   const driver = this.drivers.find(d => d.id === driverId);
    //   return driver ? driver.userFullName : 'Unknown Driver';
    // }
    return 'Unknown Driver';
  };
}

