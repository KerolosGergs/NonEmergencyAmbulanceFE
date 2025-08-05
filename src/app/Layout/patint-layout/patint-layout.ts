import { TripService } from './../../Core/Services/TripService/trip';
import { RequestService } from './../../Core/Services/RequestService/request-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PatientRequest } from '../../Core/interface/Patient/ipatient';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../Core/Services/PatientServise/patient-service';
import { RequestStatus } from '../../Core/interface/Request/irequest';
import { PatinetInfoComponent } from "./Components/patinet-info/patinet-info";
import { DriverInfo, NurseInfo, PatientInfo } from './Models/patient-model';
import { DriverInfoComponent } from "./Components/driver-info/driver-info";
import { NurseInfoComponent } from './Components/nurse-info/nurse-info';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Nav } from "../../Shared/Components/nav/nav";
import { Footer } from "../../Shared/Components/footer/footer";
@Component({
  selector: 'app-patint-layout',
  imports: [PatinetInfoComponent, DriverInfoComponent, NurseInfoComponent, FormsModule, ReactiveFormsModule, NgClass, Nav, Footer],
  templateUrl: './patint-layout.html',
  styleUrl: './patint-layout.scss'
})
export class PatintLayout implements OnInit, OnDestroy {

  requests: PatientRequest[] = [];
  isProcessing = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private patientService: PatientService,
    private toastr: ToastrService,
    private RequestService: RequestService,
    private TripService : TripService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.patientService.getPatientRequests().subscribe(
        requests => {
          this.requests = requests.data;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  confirmRequest(requestId: number): void {
    this.isProcessing = true;

    try {
      this.RequestService.confirmRequestByPatient(requestId).subscribe(
        (response): any =>{
          if(response.success)
          {
            this.toastr.success(response.message, 'Success');

          }else {
            this.toastr.error(response.message, 'Error');
          }
        },
        (error) => {
          this.toastr.error(error, 'Error');
        }

      );
    } catch (error) {
      this.toastr.error('Failed to confirm request. Please try again.', 'Error');
    } finally {
      this.isProcessing = false;
    }
  }

  cancelRequest(requestId: number): void {
    this.isProcessing = true;

    try {
      this.RequestService.cancelRequest(requestId);
      this.toastr.warning('Request has been cancelled.', 'Cancelled');
    } catch (error) {
      this.toastr.error('Failed to cancel request. Please try again.', 'Error');
    } finally {
      this.isProcessing = false;
    }
  }

  getStatusText(status: RequestStatus): string {
    return this.patientService.getStatusText(status);
  }

  getStatusClass(status: RequestStatus): string {
    return this.patientService.getStatusClass(status);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getPatientInfo(request: PatientRequest): PatientInfo {
    return {
      patientId: request.patientId,
      patientName: request.patientName!,
      patientPhone: request.patientPhone!,
      patientAddress: request.patientAddress!,
      patientImageUrl: request.patientImageUrl!
    };
  }

  getDriverInfo(request: PatientRequest): DriverInfo {
    return {
      driverId: request.driverId!,
      driverName: request.driverName!,
      driverPhone: request.driverPhone!,
      driverImg: request.driverImg!
    };
  }

  getNurseInfo(request: PatientRequest): NurseInfo {
    return {
      nurseId: request.nurseId!,
      nurseName: request.nurseName!,
      nursePhone: request.nursePhone!,
      nurseImg: request.nurseImg!
    };
  }
}


