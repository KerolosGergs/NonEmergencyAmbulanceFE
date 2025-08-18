import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
  @Input() TripID! :number ; 
  @Input() Price! :number ;
  paymentForm: FormGroup;
  selectedPaymentMethod = 'creditCard';
  months: string[] = [];
  years: string[] = [];

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      paymentMethod: ['creditCard', Validators.required],
      cardholderName: ['', Validators.required],
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
    // Populate months
    for (let i = 1; i <= 12; i++) {
      this.months.push(i.toString().padStart(2, '0'));
    }

    // Populate years (next 10 years)
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push((currentYear + i).toString());
    }
  }

  private updateValidators(paymentMethod: string): void {
    const cardControls = ['cardholderName', 'cardNumber', 'expiryMonth', 'expiryYear', 'cvv', 'terms'];
    const creditCardValidators = {
        cardholderName: [Validators.required],
        cardNumber: [Validators.required, Validators.pattern('^[0-9]{16}$'), Validators.minLength(16)],
        expiryMonth: [Validators.required],
        expiryYear: [Validators.required],
        cvv: [Validators.required, Validators.pattern('^[0-9]{3,4}$'), Validators.minLength(3)],
        terms: [Validators.requiredTrue]
    };

    if (paymentMethod === 'creditCard') {
      cardControls.forEach(controlName => {
        this.paymentForm.get(controlName)?.setValidators(creditCardValidators[controlName as keyof typeof creditCardValidators]);
      });
    } else {
      cardControls.forEach(controlName => {
        this.paymentForm.get(controlName)?.clearValidators();
      });
    }
    cardControls.forEach(controlName => this.paymentForm.get(controlName)?.updateValueAndValidity());
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Form Submitted!', this.paymentForm.value);
      // Here you would integrate with a real payment gateway
      alert('Payment successful!');
    } else {
      console.error('Form is invalid');
      this.paymentForm.markAllAsTouched();
    }
  }
}
