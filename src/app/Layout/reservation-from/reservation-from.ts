import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmergencyRequest, LocationPoint } from './Models/ireservation';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Nav } from "../../Shared/Components/nav/nav";
import { Footer } from "../../Shared/Components/footer/footer";

@Component({
  selector: 'app-reservation-from',
  imports: [ReactiveFormsModule, FormsModule, Nav, Footer],
  templateUrl: './reservation-from.html',
  styleUrl: './reservation-from.scss'
})
export class ReservationFrom {
 formData: EmergencyRequest = {
    pickupAddress: '',
    dropOffAddress: '',
    scheduledDate: '',
    emergencyType: '',
    notes: ''
  };

  minDateTime = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  validationErrors: string[] = [];

  isSelectingPickup = false;
  isSelectingDropoff = false;

  constructor() {}

  ngOnInit(): void {
    this.setMinDateTime();
  }

  private setMinDateTime(): void {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  toggleLocationSelection(type: 'pickup' | 'dropoff'): void {
    if (type === 'pickup') {
      this.isSelectingPickup = !this.isSelectingPickup;
      this.isSelectingDropoff = false;
    } else {
      this.isSelectingDropoff = !this.isSelectingDropoff;
      this.isSelectingPickup = false;
    }
  }

  onSubmit(): void {
    this.clearMessages();

    if (!this.formData.pickupAddress || !this.formData.dropOffAddress || !this.formData.scheduledDate || !this.formData.emergencyType) {
      this.validationErrors.push('All required fields must be filled.');
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      this.successMessage = 'Emergency request submitted successfully!';
      this.resetForm();
      this.isSubmitting = false;
    }, 1000);
  }

  private resetForm(): void {
    this.formData = {
      pickupAddress: '',
      dropOffAddress: '',
      scheduledDate: '',
      emergencyType: '',
      notes: ''
    };
    this.isSelectingPickup = false;
    this.isSelectingDropoff = false;
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.validationErrors = [];
  }
}