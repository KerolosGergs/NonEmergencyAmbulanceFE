import { Component } from '@angular/core';
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}
@Component({
  selector: 'app-why-us',
  imports: [],
  templateUrl: './why-us.html',
  styleUrl: './why-us.scss'
})
export class WhyUs {

  // Section content - easy to modify
  sectionTitle: string = 'Why Choose MediTransport';
  sectionDescription: string = 'We\'re committed to providing the highest quality non-emergency medical transportation services.';

  // Features data - easy to modify
  features: Feature[] = [
    {
      id: 1,
      title: 'Trained Medical Staff',
      description: 'Our team includes certified EMTs, paramedics, and healthcare professionals trained to provide appropriate care during transport.',
      icon: 'bi-person-badge',
      iconColor: '#17a2b8'
    },
    {
      id: 2,
      title: 'Modern Fleet',
      description: 'Well-maintained, fully-equipped vehicles designed for patient comfort and safety during transportation.',
      icon: 'bi-truck',
      iconColor: '#007bff'
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist with bookings, inquiries, and any concerns you may have.',
      icon: 'bi-headset',
      iconColor: '#17a2b8'
    },
    {
      id: 4,
      title: 'Safety First',
      description: 'Rigorous safety protocols and regular training ensure the highest standards of patient care and transport safety.',
      icon: 'bi-shield-check',
      iconColor: '#007bff'
    },
    {
      id: 5,
      title: 'Insurance Coverage',
      description: 'We work with most insurance providers and can help determine your coverage for non-emergency medical transportation.',
      icon: 'bi-clipboard-check',
      iconColor: '#17a2b8'
    },
    {
      id: 6,
      title: 'Wide Service Area',
      description: 'Comprehensive coverage across the region, serving urban and rural communities with reliable transportation.',
      icon: 'bi-geo-alt',
      iconColor: '#007bff'
    }
  ];

  constructor() { }
}
