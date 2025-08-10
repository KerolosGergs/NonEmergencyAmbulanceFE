import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
// ... other imports
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ambulance, AmbulanceStatus, getAmbulanceStatusLabel } from '../../../models/interfaces';
import { AmbulanceDto } from '../../../../../../../Core/interface/Ambulance/iambulance';
import { AmbulanceService } from '../../../../../../../Core/Services/Ambulance/ambulance-service';
import { IDriver } from '../../../../../../../Core/interface/Driver/IDriver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-ambulance-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-ambulance-modal.html',
  styleUrls: ['./edit-ambulance-modal.scss']
})
export class EditAmbulanceModalComponent implements OnInit {
  @Input() ambulance!: Ambulance;
  @Input() drivers: IDriver[] = []; // Input the list of all available drivers
  @Output() closeModal = new EventEmitter<boolean>();

  ambulanceData!: Ambulance;
  toastr = inject(ToastrService);

  // Define status options for the dropdown
  statusOptions = [
    { value: AmbulanceStatus.AVAILABLE, label: getAmbulanceStatusLabel(AmbulanceStatus.AVAILABLE) },
    { value: AmbulanceStatus.IN_USE, label: getAmbulanceStatusLabel(AmbulanceStatus.IN_USE) },
    { value: AmbulanceStatus.MAINTENANCE, label: getAmbulanceStatusLabel(AmbulanceStatus.MAINTENANCE) },
    { value: AmbulanceStatus.OUT_OF_SERVICE, label: getAmbulanceStatusLabel(AmbulanceStatus.OUT_OF_SERVICE) }
  ];

  constructor(private ambulanceService: AmbulanceService) {}

  ngOnInit(): void {
    this.ambulanceData = { ...this.ambulance };
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.toastr.warning('Please fill all required fields.', 'Validation Error');
      return;
    }

    const dto: AmbulanceDto = {
      plateNumber: this.ambulanceData.plateNumber,
      currentLocation: this.ambulanceData.currentLocation,
      status: Number(this.ambulanceData.status), // Ensure status is a number
      type: this.ambulanceData.type,
      driverId: Number(this.ambulanceData.driverId) // Ensure driverId is a number
    };

    this.ambulanceService.updateAmbulance(this.ambulanceData.ambulanceId, dto).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success('Ambulance updated successfully!', 'Success');
          this.close(true);
        } else {
          this.toastr.error(response.message || 'Failed to update ambulance.', 'Error');
        }
      },
      error: (err) => {
        console.error('Error updating ambulance:', err);
        this.toastr.error('An error occurred while updating the ambulance.', 'Error');
      }
    });
  }

  close(shouldRefresh: boolean = false): void {
    this.closeModal.emit(shouldRefresh);
  }
}
