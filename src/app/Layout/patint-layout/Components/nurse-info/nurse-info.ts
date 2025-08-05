import { Component, Input } from '@angular/core';
import { NurseInfo } from '../../Models/patient-model';

@Component({
  selector: 'app-nurse-info',
  imports: [],
  templateUrl: './nurse-info.html',
  styleUrl: './nurse-info.scss'
})
export class NurseInfoComponent {
 @Input() nurseInfo: NurseInfo | null = null;

  getNurseImage(): string {
    if (this.nurseInfo?.nurseImg) {
      return `${this.nurseInfo.nurseImg}`;
    }
    return 'Patient_logo.png';
  }

  // onImageError(event: any): void {
  //   event.target.src = 'assets/images/default-nurse.png';
  // }
}

