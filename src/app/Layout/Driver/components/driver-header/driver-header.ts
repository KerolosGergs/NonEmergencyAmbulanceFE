import { Component, OnInit, inject } from '@angular/core';
import { IDriver } from '../../../../Core/interface/Driver/IDriver';
import { DriverService } from '../../../../Core/Services/Driver/driver';

@Component({
  selector: 'app-driver-header',
  standalone: true,
  imports: [],
  templateUrl: './driver-header.html',
  styleUrls: ['./driver-header.scss']
})
export class DriverHeader implements OnInit {
  // Services
  private readonly driverService = inject(DriverService);

  // Driver data
  driverData!: IDriver;

  ngOnInit(): void {
    this.loadDriver(4); // Replace 4 with dynamic ID if needed
  }

  /** Load driver by ID */
  private loadDriver(driverId: number): void {
    this.driverService.getById(driverId).subscribe({
      next: (driver) => {
        if (driver.success) {
          
          this.driverData = driver.data;
        }
      },
      error: (error) => {
        console.error('Error fetching driver data:', error);
      }
    });
  }

  /** Get driver's full name */
  get driverName(): string {
    return this.driverData?.userFullName ?? 'Unknown Driver';
  }

  /** Get driver's ID */
  get driverId(): number | string {
    return this.driverData?.id ?? 'N/A';
  }

  /** Get driver's profile image (optional default) */
  // get profileImageUrl(): string {
  //   return this.driverData?.profileImage ?? 'assets/default-profile.png';
  // }
}
