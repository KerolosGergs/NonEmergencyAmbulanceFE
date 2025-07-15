import { Component } from '@angular/core';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}
@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.scss'
})
export class Faq {

// Section content - easy to modify
  sectionTitle: string = 'Frequently Asked Questions';
  sectionDescription: string = 'Find answers to common questions about our non-emergency medical transportation services.';
  
  // View All FAQs link - easy to modify
  viewAllText: string = 'View All FAQs';
  viewAllLink: string = '/faqs';

  // FAQ data - easy to modify
  faqs: FAQ[] = [
    {
      id: 1,
      question: 'What types of medical transportation do you offer?',
      answer: 'We provide a range of services including wheelchair-accessible vans, stretcher vans, and ambulances for non-emergency medical transportation. Our services are tailored to meet various patient needs and medical requirements.'
    },
    {
      id: 2,
      question: 'Is your service covered by insurance?',
      answer: 'Many insurance plans cover non-emergency medical transportation. We work with most major insurance providers and can help verify your coverage before booking. Medicare and Medicaid may cover services when medically necessary.'
    },
    {
      id: 3,
      question: 'How far in advance should I book transportation?',
      answer: 'We recommend booking at least 24-48 hours in advance to ensure availability. For regular appointments or scheduled hospital discharges, booking several days ahead is ideal. We do offer same-day service when available for urgent needs.'
    },
    {
      id: 4,
      question: 'What qualifications do your staff members have?',
      answer: 'Our team includes certified EMTs, paramedics, and healthcare professionals with specialized training in patient transport. All staff undergo background checks, regular training, and certification in CPR and first aid.'
    }
  ];

  constructor() { }

  // View All FAQs click handler
  onViewAllFAQs(): void {
    console.log('View All FAQs clicked');
    // Add your navigation logic here
    // Example: this.router.navigate([this.viewAllLink]);
  }
}
