import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../Core/Services/TripService/trip';


@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss']
})
export class PaymentFormComponent implements OnInit {
    private readonly tripService = inject(TripService);

   tripId!: number;
   price!: number;

  

  paymentForm: FormGroup;
  selectedPaymentMethod = 'creditCard';
  months: string[] = [];
  years: string[] = [];

  constructor(private fb: FormBuilder, private toastr: ToastrService,private routeActivatedRoute: ActivatedRoute,private router:Router) {
    this.paymentForm = this.fb.group({});
  }

 
  ngOnInit(): void {
      this.tripId = Number(this.routeActivatedRoute.snapshot.paramMap.get('tripId'));
    this.price = Number(this.routeActivatedRoute.snapshot.paramMap.get('price'));
    this.paymentForm = this.fb.group({
      paymentMethod: ['creditCard', Validators.required],
      cardholderName: ['', [Validators.required, Validators.maxLength(100)]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$'), Validators.minLength(16)]],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$'), Validators.minLength(3)]],
      terms: [false, Validators.requiredTrue]
    });

    this.populateDateDropdowns();

    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      this.selectedPaymentMethod = value;
      this.updateValidators(value);
    });
  }

  private populateDateDropdowns(): void {
    for (let i = 1; i <= 12; i++) this.months.push(i.toString().padStart(2, '0'));
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) this.years.push((currentYear + i).toString());
  }

  private updateValidators(paymentMethod: string): void {
    const cardControls = ['cardholderName', 'cardNumber', 'expiryMonth', 'expiryYear', 'cvv', 'terms'] as const;
      const creditCardValidators: Record<(typeof cardControls)[number], ValidatorFn[]> = {
    cardholderName: [Validators.required, Validators.maxLength(100)],
    cardNumber: [Validators.required, Validators.pattern('^[0-9]{16}$'), Validators.minLength(16)],
    expiryMonth: [Validators.required],
    expiryYear: [Validators.required],
    cvv: [Validators.required, Validators.pattern('^[0-9]{3,4}$'), Validators.minLength(3)],
    terms: [Validators.requiredTrue]
  };

    if (paymentMethod === 'creditCard') {
      cardControls.forEach(c => this.paymentForm.get(c)?.setValidators(creditCardValidators[c]));
    } else {
      cardControls.forEach(c => this.paymentForm.get(c)?.clearValidators());
    }
    cardControls.forEach(c => this.paymentForm.get(c)?.updateValueAndValidity());
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
     this.tripService.completeTrip(this.tripId).subscribe({
      next: () => {
        this.toastr.success('Trip completed successfully');
        this.router.navigate(['/patient']);
      },
      error: (err) => {
        console.error('Error completing trip:', err);
         this.router.navigate(['/patient']);
      }
    });
  }
  }
}