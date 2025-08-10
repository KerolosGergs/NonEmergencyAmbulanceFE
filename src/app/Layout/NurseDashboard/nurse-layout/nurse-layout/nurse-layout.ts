import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IRequestData } from './../../../../Core/interface/irequest';
import { NurseService } from './../../../../Core/Services/NurseServise/nurse-service';
import { RequestService } from '../../../../Core/Services/RequestService/request-service';

// UI Components
import { NHeader } from '../../components/n-header/n-header';
import { PendingApprovalRequests } from '../../components/pending-approval-requests/pending-approval-requests';
import { PatientDetails } from '../../components/patient-details/patient-details';
import { YourSchedule } from '../../components/your-schedule/your-schedule';
import { Nav } from '../../../../Shared/Components/nav/nav';
import { Footer } from '../../../../Shared/Components/footer/footer';
<<<<<<< Updated upstream
=======
import { IRequest } from '../../../../Core/interface/Request/irequest';
import { NurseRequests } from "../../components/nurse-requests/nurse-requests";
>>>>>>> Stashed changes

@Component({
  selector: 'app-nurse-layout',
  standalone: true,
  imports: [
    CommonModule,
    NHeader,
    PendingApprovalRequests,
    PatientDetails,
    YourSchedule,
   
    NurseRequests
],
  templateUrl: './nurse-layout.html',
  styleUrls: ['./nurse-layout.scss']
})
export class NurseLayout implements OnInit {
  // Injected services
  private readonly nurseService = inject(NurseService);

  // Data
  requestsData: IRequestData[] = [];
  selectedRequest?: IRequestData;

  ngOnInit(): void {
    this.getUnassignedRequestsForNurse();
  }

  /** Fetch unassigned requests for nurse */
  private getUnassignedRequestsForNurse(): void {
    this.nurseService.GetUnassignedRequestsForNurse().subscribe({
      next: (data) => {
<<<<<<< Updated upstream
        this.requestsData = data;
=======
        
        if(data.success){
          this.requestsData = data.data;

        }
>>>>>>> Stashed changes
        console.log('Fetched requests:', data);
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
      }
    });
  }
}
