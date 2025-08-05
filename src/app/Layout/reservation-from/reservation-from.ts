import { RequestService } from './../../Core/Services/RequestService/request-service';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Footer } from '../../Shared/Components/footer/footer';
import { Nav } from '../../Shared/Components/nav/nav';
import { EmergencyFormData } from './map/interface/location';
import { LocationMap } from './map/interface/location';
import { Map } from './map/map';
import { ToastrService } from 'ngx-toastr';
import { GenerialResponse } from '../../Core/interface/GenerialResponse/GenerialResponse';

@Component({
  selector: 'app-reservation-from',
  imports: [ReactiveFormsModule, FormsModule, Nav, Footer, Map],
  templateUrl: './reservation-from.html',
  styleUrl: './reservation-from.scss'
})
export class ReservationFrom implements OnInit {
  formData: EmergencyFormData = {
    pickupAddress: '',
    dropOffAddress: '',
    scheduledDate: '',
    emergencyType: '',
    notes: ''
  };

  pickupLocation: LocationMap | null = null;
  dropoffLocation: LocationMap | null = null;

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  validationErrors: string[] = [];
  minDateTime = '';

  ngOnInit() {
    this.setMinDateTime();
  }

  private setMinDateTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  onPickupLocationSelected(location: LocationMap) {
    this.pickupLocation = location;
    this.formData.pickupAddress = location.address;
    this.formData.pickupLocation = location;
    this.clearMessages();
  }

  onPickupLocationCleared() {
    this.pickupLocation = null;
    this.formData.pickupAddress = '';
    this.formData.pickupLocation = undefined;
  }

  onDropoffLocationSelected(location: LocationMap) {
    this.dropoffLocation = location;
    this.formData.dropOffAddress = location.address;
    this.formData.dropoffLocation = location;
    this.clearMessages();
  }

  onDropoffLocationCleared() {
    this.dropoffLocation = null;
    this.formData.dropOffAddress = '';
    this.formData.dropoffLocation = undefined;
  }
  RequestService = inject(RequestService)
  toastr = inject(ToastrService);
  onSubmit(): void {
    debugger
    this.clearMessages();
    debugger
    if (this.validateForm()) {
      this.isSubmitting = true;

      this.RequestService.createRequest(this.formData).subscribe({

        next: (response: GenerialResponse<any>) => {
          if (response.success) {
            this.successMessage = response.message || 'Emergency request submitted successfully!';
            this.toastr.success(this.successMessage, 'Success');

            console.log('Form Data:', this.formData);
            console.log('Pickup Address:', this.formData.pickupAddress);
            console.log('Drop-off Address:', this.formData.dropOffAddress);

            // Reset form after 3 seconds
            setTimeout(() => {
              this.resetForm();
            }, 3000);
          } else {
            this.errorMessage = response.message || 'Failed to submit emergency request.';
            this.toastr.error(this.errorMessage, 'Error');
          }

          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error creating request:', error);
          this.errorMessage = 'An error occurred while submitting the request. Please try again.';
          this.toastr.error(this.errorMessage, 'Error');
          this.isSubmitting = false;
        }
      });

    }
  }

  private validateForm(): boolean {
    this.validationErrors = [];

    if (!this.formData.pickupAddress) {
      this.validationErrors.push('Pickup location is required');
    }

    if (!this.formData.dropOffAddress) {
      this.validationErrors.push('Drop-off location is required');
    }

    if (!this.formData.scheduledDate) {
      this.validationErrors.push('Scheduled date and time is required');
    }

    if (!this.formData.emergencyType) {
      this.validationErrors.push('Emergency type is required');
    }

    return this.validationErrors.length === 0;
  }

  private clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
    this.validationErrors = [];
  }

  private resetForm() {
    this.formData = {
      pickupAddress: '',
      dropOffAddress: '',
      scheduledDate: '',
      emergencyType: '',
      notes: ''
    };
    this.pickupLocation = null;
    this.dropoffLocation = null;
    this.clearMessages();
  }

  trackByIndex(index: number): number {
    return index;
  }
  distance: number = 0;
  price: number = 0;

  onAddressChange(): void {
    if (this.formData.pickupAddress && this.formData.dropOffAddress) {
      // Simulate distance calculation (replace this with real API/logic)
      // this.calculateDistanceAndPrice(this.formData.pickupAddress, this.formData.dropOffAddress);
      this.RequestService.getDistance(this.formData.pickupAddress, this.formData.dropOffAddress).subscribe({
        next: (response: GenerialResponse<{ distance: number; }>) => {
          if (response.success) {
            this.distance = response.data.distance;

            this.price = response.data.distance * 20;
          }
        }
      })
    } else {
      this.distance = 0;
      this.price = 0;
    }
  }

  // private calculateDistanceAndPrice(pickup: string, dropoff: string): void {
  //   // Example: Random distance simulation (replace with real logic)
  //   const simulatedDistance = Math.random() * (20 - 5) + 5; // Simulate between 5km to 20km
  //   this.distance = simulatedDistance;

  //   // Example Pricing: 20 EGP base + 5 EGP per km
  //   const basePrice = 20;
  //   const pricePerKm = 5;
  //   this.price = basePrice + (this.distance * pricePerKm);
  // }

}