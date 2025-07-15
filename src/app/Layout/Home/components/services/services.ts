import { Component } from '@angular/core';
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  buttonText: string;
}
@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {

  // Section content - easy to modify
  sectionTitle: string = 'Our Services';
  sectionDescription: string = 'We offer a range of non-emergency medical transportation services tailored to meet your specific healthcare needs.';

  // Services data - easy to modify
  services: Service[] = [
    {
      id: 1,
      title: 'Hospital Transfers',
      description: 'Safe and comfortable transportation between healthcare facilities with professional medical supervision.',
      icon: 'bi bi-hospital',
      buttonText: 'Book Transfer'
    },
    {
      id: 2,
      title: 'Medical Appointments',
      description: 'Reliable transportation to and from scheduled medical appointments with personalized assistance.',
      icon: 'bi bi-calendar',
      buttonText: 'Schedule Ride'
    },
    {
      id: 3,
      title: 'Specialized Care Transport',
      description: 'Equipped vehicles and trained staff for patients requiring specialized medical equipment during transport.',
      icon: 'bi bi-heart-pulse',
      buttonText: 'Request Service'
    }
  ];

  // Simple button click handler
  onServiceClick(service: Service): void {
    console.log(`${service.buttonText} clicked for ${service.title}`);
    // Add your navigation or action logic here
    // Example: this.router.navigate(['/booking', service.id]);
  }
}
