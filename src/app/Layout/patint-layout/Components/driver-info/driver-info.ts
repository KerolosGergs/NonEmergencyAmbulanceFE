import { Component, Input } from '@angular/core';
import { DriverInfo } from '../../Models/patient-model';

@Component({
  selector: 'app-driver-info',
  imports: [],
  templateUrl: './driver-info.html',
  styleUrl: './driver-info.scss'
})
export class DriverInfoComponent {
  @Input() driverInfo: DriverInfo | null = null;

  getDriverImage(): string {
    if (this.driverInfo?.driverImg) {
      return `${this.driverInfo.driverImg}`;
    }
    return 'Patient_logo.png';
  }


}