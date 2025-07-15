import { Component } from '@angular/core';
export interface WorkStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}
@Component({
  selector: 'app-how-work',
  imports: [],
  templateUrl: './how-work.html',
  styleUrl: './how-work.scss'
})
export class HowWork {
 // Section content - easy to modify
  sectionTitle: string = 'How It Works';
  sectionDescription: string = 'Our simple booking process ensures you get the transportation you need with minimal hassle.';
  
  // Call to action button
  ctaButtonText: string = 'Book Your Transport';

  // How it works steps - easy to modify
  steps: WorkStep[] = [
    {
      id: 1,
      title: 'Book Online',
      description: 'Fill out our simple booking form with your transportation details and requirements.',
      icon: 'bi-laptop'
    },
    {
      id: 2,
      title: 'Confirmation',
      description: 'Receive booking confirmation and details about your assigned medical transport team.',
      icon: 'bi-check-circle'
    },
    {
      id: 3,
      title: 'Pickup',
      description: 'Our professional team arrives at your location with the appropriate vehicle and equipment.',
      icon: 'bi-geo-alt'
    },
    {
      id: 4,
      title: 'Safe Transport',
      description: 'Enjoy safe, comfortable transportation with trained medical professionals.',
      icon: 'bi-shield-check'
    }
  ];

  // Button click handler
  onBookTransport(): void {
    console.log('Book Your Transport clicked');
    // Add your navigation or action logic here
    // Example: this.router.navigate(['/booking']);
  }
}
