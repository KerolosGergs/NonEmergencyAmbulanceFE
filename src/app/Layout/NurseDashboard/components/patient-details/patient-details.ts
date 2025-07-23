import { Component, inject, Input } from '@angular/core';
import { Request } from '../../../../Core/interface/request';
import { CommonModule } from '@angular/common';
import { IRequestData } from '../../../../Core/interface/irequest';
import { NurseService } from '../../../../Core/Services/NurseServise/nurse-service';

@Component({
  selector: 'app-patient-details',
  imports: [CommonModule],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss'
})
export class PatientDetails {
    @Input() patient?: IRequestData;
    
}
