import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-modal.html',
  styleUrls: ['./payment-modal.scss'],
})
export class PaymentModalComponent {
  @Input() tripId!: number;
  @Input() price!: number;

  @Output() close = new EventEmitter<void>();
  @Output() pay = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  payNow(): void {
    this.pay.emit();
  }
}

