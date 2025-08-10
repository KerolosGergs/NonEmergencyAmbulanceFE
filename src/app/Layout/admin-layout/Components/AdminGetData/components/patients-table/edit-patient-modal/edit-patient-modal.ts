import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminPatient } from '../../../../../../../Core/interface/Admin/iadmin';
import { Gender } from '../../../models/interfaces';
import { PatientService } from '../../../../../../../Core/Services/PatientServise/patient-service';


@Component({
  selector: 'app-edit-patient-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-patient-modal.html',
  styleUrls: ['./edit-patient-modal.scss']
})
export class EditPatientModalComponent implements OnChanges {
  @Input() patient: AdminPatient | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() patientUpdated = new EventEmitter<void>();

  editablePatient: AdminPatient | null = null;
  isLoading = false;
  errorMessage = '';
  genderEnum = Gender; // Expose Gender enum to the template

  constructor(private patientService: PatientService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      // Create a copy to avoid modifying the original object directly
      this.editablePatient = { ...this.patient };
    }
  }



  onSubmit(form: NgForm): void {
    if (form.invalid || !this.editablePatient) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    
    this.patientService.updatePatient(this.editablePatient.id, this.editablePatient).subscribe({
      next: (response) => {
        if (response.success) {
          this.isLoading = false;
          this.patientUpdated.emit();
          this.closeModal();
        } else {
          this.errorMessage = response.message || 'An unknown error occurred.';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to connect to the server. Please try again later.';
        console.error('Error updating patient:', err);
        this.isLoading = false;
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}
