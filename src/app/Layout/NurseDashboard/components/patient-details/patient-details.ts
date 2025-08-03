import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRequestData } from '../../../../Core/interface/irequest';
import { NurseService } from '../../../../Core/Services/NurseServise/nurse-service';
import { IRequest } from '../../../../Core/interface/Request/irequest';

@Component({
  selector: 'app-patient-details',
  imports: [CommonModule],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss'
})
export class PatientDetails {
    @Input() patient?: IRequest;

}
