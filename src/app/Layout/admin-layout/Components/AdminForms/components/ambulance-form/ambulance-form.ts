import { AmbulanceService } from './../../../../../../Core/Services/Ambulance/ambulance-service';
import { AuthService } from './../../../../../../Core/Services/AuthServices/auth-service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ambulance, FormErrors, AmbulanceStatus, AmbulanceType, Driver, DriverWithId } from '../../../../../../Core/interface/FormsInterface';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../../../../Core/Services/AdminServices/admin-service';
import { response } from 'express';

@Component({
  selector: 'app-ambulance-form',
  standalone: true,
  imports: [CommonModule, FormsModule ,ReactiveFormsModule],
  templateUrl: './ambulance-form.html',
  styleUrl: './ambulance-form.css'
})
export class AmbulanceFormComponent {
 form: FormGroup;
  isSubmitting = false;

  statusOptions = [
    { value: AmbulanceStatus.Available, label: 'Available' },
    { value: AmbulanceStatus.InService, label: 'In Service' },
    { value: AmbulanceStatus.UnderMaintenance, label: 'Under Maintenance' }
  ];

  typeOptions = [
    { value: AmbulanceType.Regular, label: 'Regular' },
    { value: AmbulanceType.EquippedWithNurse, label: 'Equipped with Nurse' }
  ];

  drivers: DriverWithId[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private adminService: AdminService,
    private AmbulanceService: AmbulanceService
  ) {
    this.form = this.fb.group({
      plateNumber: ['', Validators.required],
      currentLocation: ['', Validators.required],
      status: [AmbulanceStatus.Available, Validators.required],
      type: [AmbulanceType.Regular, Validators.required],
      driverId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.adminService.getAdminDrivers().subscribe({
      next: response => {
        if (response.success) this.drivers =response.data}
      // error: () => this.toastr.error('Failed to load drivers.', 'Error')
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;

    this.AmbulanceService.createAmbulance(this.form.value).subscribe({
      next: () => {
        this.toastr.success('Ambulance registered successfully!', 'Success');
        this.form.reset({
          status: AmbulanceStatus.Available,
          type: AmbulanceType.Regular,
          driverId: null
        });
        this.isSubmitting = false;
      },
      error: () => {
        this.toastr.error('Error registering ambulance.', 'Error');
        this.isSubmitting = false;
      }
    });
  }
}