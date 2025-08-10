import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminNurse } from '../../../../../../../Core/interface/Admin/iadmin';
import { NurseService } from '../../../../../../../Core/Services/NurseServise/nurse-service';

@Component({
  selector: 'app-edit-nurse-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-nurse-modal.html',
  styleUrls: ['./edit-nurse-modal.scss']
})
export class EditNurseModalComponent implements OnInit {
  @Input() nurse: AdminNurse | null = null;
  @Output() closeModal = new EventEmitter<boolean>(); // Emit true if data was updated

  editableNurse: Partial<AdminNurse> = {};
  isLoading = false;
  toastr = inject(ToastrService);

  constructor(private nurseService: NurseService) {}

  ngOnInit(): void {
    // Create a copy of the nurse object to avoid modifying the original data directly
    if (this.nurse) {
      this.editableNurse = { ...this.nurse };
    }
  }

  onFormSubmit(form: NgForm): void {
    if (form.invalid || !this.editableNurse.id) {
      this.toastr.warning('Please fill all required fields.', 'Invalid Form');
      return;
    }

    this.isLoading = true;
    // The updateNurse service expects an INurse object, so we ensure the type is correct.
    // We assume AdminNurse is compatible with INurse for the update operation.
    this.nurseService.updateNurse(this.editableNurse.id, this.editableNurse as AdminNurse).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success('Nurse details updated successfully!', 'Success');
          this.close(true); // Close modal and signal that an update occurred
        } else {
          this.toastr.error(response.message || 'An unknown error occurred.', 'Update Failed');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error updating nurse:', err);
        this.toastr.error('Failed to update nurse. Please try again.', 'API Error');
        this.isLoading = false;
      }
    });
  }

  close(updated: boolean = false): void {
    this.closeModal.emit(updated);
  }
}
