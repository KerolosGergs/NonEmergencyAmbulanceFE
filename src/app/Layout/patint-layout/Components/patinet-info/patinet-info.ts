import { Component, Input } from '@angular/core';
import { PatientInfo } from '../../Models/patient-model';

@Component({
  selector: 'app-patinet-info',
  imports: [],
  templateUrl: './patinet-info.html',
  styleUrl: './patinet-info.scss'
})
export class PatinetInfoComponent {
@Input() patientInfo: PatientInfo | null = null;

  getPatientImage(): string {
    if (this.patientInfo?.patientImageUrl=="") {
      return `${this.patientInfo.patientImageUrl}`;
    }
    return 'assets/Patient_logo.png';
  }

  // onImageError(event: any): void {
  //   event.target.src = 'Patient_logo.png';
  // }
}

