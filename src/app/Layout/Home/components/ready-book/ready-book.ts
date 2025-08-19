import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ready-book',
  imports: [],
  templateUrl: './ready-book.html',
  styleUrl: './ready-book.scss'
})
export class ReadyBook {

  // Section content - easy to modify
  title: string = 'Ready to Book Your Non-Emergency Medical Transport?';
  description: string = 'Our team is standing by to provide you with safe, comfortable, and reliable transportation for your medical needs. Book online or contact us to discuss your specific requirements.';
  
  // Buttons - easy to modify
  primaryButtonText: string = 'Book Transport Now';
  secondaryButtonText: string = 'Contact Us';
  
  // Contact info - easy to modify
  phoneNumber: string = '1-800-MED-HELP';
  phoneDisplayText: string = 'Call us: 1-800-MED-HELP';
  
  // Image - easy to modify
  heroImage: string = 'assets/images/ambulance-team.jpg';
  heroImageAlt: string = 'Medical transport team helping patient';

  constructor(private router :Router) { }

  // Button click handlers
  onBookTransport(): void {
        this.router.navigate(['/FormRequest']);
    console.log('Book Transport Now clicked');
    // Add your navigation or action logic here
    // Example: this.router.navigate(['/booking']);
  }

  onContactUs(): void {
    console.log('Contact Us clicked');
    // Add your navigation or action logic here
    // Example: this.router.navigate(['/contact']);
  }

  onCallUs(): void {
    console.log('Call us clicked');
    // Add phone call logic here
    // Example: window.open(`tel:${this.phoneNumber}`);
  }
}
