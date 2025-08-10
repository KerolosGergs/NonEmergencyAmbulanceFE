import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDriver } from '../../../../../../../Core/interface/Driver/IDriver';
import { DriverService } from '../../../../../../../Core/Services/Driver/driver';


@Component({
  selector: 'app-edit-driver-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-driver-modal.html',
  styleUrls: ['./edit-driver-modal.scss']
})
export class EditDriverModalComponent implements OnInit {
  @Input() driver: IDriver | null = null;
  @Output() closeModal = new EventEmitter<boolean>(); // Emits true if data was updated

  // Create a local, editable copy of the driver to avoid changing the original object directly
  editableDriver: Partial<IDriver> = {};
  isLoading = false;
  toastr = inject(ToastrService);

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    if (this.driver) {
      this.editableDriver = { ...this.driver };
    }
  }

  onFormSubmit(form: NgForm): void {
    if (form.invalid || !this.editableDriver.id) {
      this.toastr.warning('Please fill all required fields.', 'Invalid Form');
      return;
    }

    this.isLoading = true;
    // The updateDriver service expects an IDriver object.
    this.driverService.updateDriver(this.editableDriver.id, this.editableDriver as IDriver).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success('Driver details updated successfully!', 'Success');
          this.close(true); // Close modal and signal that an update occurred
        } else {
          this.toastr.error(response.message || 'An unknown error occurred.', 'Update Failed');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error updating driver:', err);
        // Check for 405 Method Not Allowed and provide a specific hint
        if (err.status === 405) {
            this.toastr.error('Method Not Allowed. The API might expect a PUT request instead of PATCH.', 'API Error');
        } else {
            this.toastr.error('Failed to update driver. Please try again.', 'API Error');
        }
        this.isLoading = false;
      }
    });
  }

  close(updated: boolean = false): void {
    this.closeModal.emit(updated);
  }
}
