import { Component } from '@angular/core';
export interface FooterLink {
  text: string;
  url: string;
}

export interface SocialLink {
  icon: string;
  url: string;
  name: string;
}

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
// Company Info - easy to modify
  companyName: string = 'MediTransport';
  companyDescription: string = 'Your trusted non-emergency medical transportation service, providing safe and comfortable journeys for patients.';
  
  // Quick Links - easy to modify
  quickLinksTitle: string = 'Quick Links';
  quickLinks: FooterLink[] = [
    { text: 'Home', url: '/' },
    { text: 'Book Ambulance', url: '/booking' },
    { text: 'Our Services', url: '/services' },
    { text: 'About Us', url: '/about' },
    { text: 'Contact', url: '/contact' }
  ];

  // Professional Links - easy to modify
  professionalLinksTitle: string = 'For Professionals';
  professionalLinks: FooterLink[] = [
    { text: 'Driver Portal', url: '/driver-portal' },
    { text: 'Nurse Portal', url: '/nurse-portal' },
    { text: 'Admin Dashboard', url: '/admin' },
    { text: 'Careers', url: '/careers' },
    { text: 'Partner With Us', url: '/partners' }
  ];

  // Contact Info - easy to modify
  contactTitle: string = 'Contact Us';
  address: string = '123 Medical Drive, Healthcare City, HC 12345';
  phone: string = '+1 (555) 123-4567';
  email: string = 'info@meditransport.co';
  serviceHours: string = '24/7 Service Available';

  // Social Media - easy to modify
  socialLinks: SocialLink[] = [
    { icon: 'bi-facebook', url: 'https://facebook.com/meditransport', name: 'Facebook' },
    { icon: 'bi-twitter', url: 'https://twitter.com/meditransport', name: 'Twitter' },
    { icon: 'bi-instagram', url: 'https://instagram.com/meditransport', name: 'Instagram' },
    { icon: 'bi-linkedin', url: 'https://linkedin.com/company/meditransport', name: 'LinkedIn' }
  ];

  // Footer Bottom - easy to modify
  copyrightYear: number = new Date().getFullYear();
  copyrightText: string = 'Non-Emergency Ambulance Booking System. All rights reserved.';
  
  footerBottomLinks: FooterLink[] = [
    { text: 'Privacy Policy', url: '/privacy' },
    { text: 'Terms of Service', url: '/terms' },
    { text: 'Cookie Policy', url: '/cookies' },
    { text: 'Accessibility', url: '/accessibility' }
  ];

  constructor() { }

  // Click handlers
  onLinkClick(url: string): void {
    console.log('Footer link clicked:', url);
    // Add your navigation logic here
    // Example: this.router.navigate([url]);
  }

  onSocialClick(social: SocialLink): void {
    console.log('Social link clicked:', social.name);
    // Add your social media logic here
    // Example: window.open(social.url, '_blank');
  }

  onPhoneClick(): void {
    console.log('Phone clicked');
    // Add phone call logic here
    // Example: window.open(`tel:${this.phone}`);
  }

  onEmailClick(): void {
    console.log('Email clicked');
    // Add email logic here
    // Example: window.open(`mailto:${this.email}`);
  }
}
