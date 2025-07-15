import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
export interface ITestimonial {
  id: number;
  rating: number;
  quote: string;
  customerName: string;
  customerRole: string;
  customerImage: string;
}
interface Star {
  filled: boolean;
  half: boolean;
}

@Component({
  selector: 'app-testimonial',
  imports: [NgClass],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.scss'
})
export class Testimonial {
 
  sectionTitle: string = 'Testimonials';
  sectionDescription: string = 'See what our patients and healthcare partners have to say about our services.';

  testimonials: ITestimonial[] = [
    {
      id: 1,
      rating: 5.0,
      quote: 'The MediTransport team was incredibly professional and caring...',
      customerName: 'Margaret Wilson',
      customerRole: 'Dialysis Patient',
      customerImage: 'assets/login/1.jpg'
    },
    {
      id: 2,
      rating: 5.0,
      quote: 'As a healthcare administrator, I\'ve been impressed...',
      customerName: 'Dr. Robert Chen',
      customerRole: 'Hospital Administrator',
      customerImage: 'assets/login/1.jpg'
    },
    {
      id: 3,
      rating: 4.5,
      quote: 'After my surgery, I needed specialized transport...',
      customerName: 'Sarah Johnson',
      customerRole: 'Post-Surgery Patient',
      customerImage: 'assets/login/1.jpg'
    }
  ];

  constructor() {}

  getRatingStars(rating: number): Star[] {
    const stars: Star[] = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      stars.push({
        filled: i < fullStars,
        half: i === fullStars && hasHalf
      });
    }

    return stars;
  }
}