// import { Patient } from './../../../admin-layout/Components/AdminGetData/models/interfaces';
// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TripService } from '../../../../Core/Services/TripService/trip';
// import { ITrip } from '../../../../Core/interface/Trip/itrip';
// import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
// import { Environment } from '../../../../../environments/environment';
// import { PatientService } from '../../../../Core/Services/PatientServise/patient-service';

// @Component({
//   selector: 'app-trip-page',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './trip-page.html',
//   styleUrls: ['./trip-page.scss']
// })
// export class TripPage implements OnInit {
//   private readonly tripService = inject(TripService);
//   private readonly authService = inject(AuthService);
//   private readonly PatientService = inject(PatientService);

//   trips: ITrip[] = [];
//   loading = false;
//   error = '';

//   ngOnInit(): void {
//     this.loadPatientTrips();
//   }

//   loadPatientTrips(): void {
//     this.loading = true;
//     const patientId = this.authService.getProfileId();
    
//     if (1) {
//       // Assuming you have a method to get trips by patient ID
//       // You might need to create this method in TripService
//       this.tripService.getTripsForPatient(1).subscribe({
//         next: (response) => {
//           if (response.success) {
//             this.trips = response.data;
//           } else {
//             this.error = 'Failed to load trips';
//           }
//           this.loading = false;
//         },
//         error: (err) => {
//           this.error = 'Error loading trips';
//           this.loading = false;
//           console.error('Error fetching trips:', err);
//         }
//       });
//     }
//   }

//   completeTrip(tripId: number): void {
//     // Update trip status to completed
//     this.tripService.updateTripStatus(tripId, 3).subscribe({
//       next: (response) => {
//         if (response.success) {
//           // Refresh trips list
//           this.loadPatientTrips();
//         }
//       },
//       error: (err) => {
//         console.error('Error completing trip:', err);
//       }
//     });
//   }

//   getStatusText(status: number): string {
//     const statusMap: { [key: number]: string } = {
//       0: 'Pending',
//       1: 'Assigned',
//       2: 'Ongoing',
//       3: 'Completed',
//       4: 'Cancelled',
//       5: 'Failed'
//     };
//     return statusMap[status] || 'Unknown';
//   }

//   getStatusClass(status: number): string {
//     switch (status) {
//       case 0: return 'status-pending';
//       case 1: return 'status-assigned';
//       case 2: return 'status-ongoing';
//       case 3: return 'status-completed';
//       case 4: return 'status-cancelled';
//       case 5: return 'status-failed';
//       default: return 'status-unknown';
//     }
//   }

//   getImageUrl(imagePath: string | undefined): string {
//     if (!imagePath) {
//       return 'assets/default-avatar.png';
//     }
//     // If the image path already has http/https, return as is
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }
//     // Otherwise, prepend the environment image URL
//     return Environment.ImgUrl + imagePath;
//   }
// } 