import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../../../Core/Services/TripService/trip';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss']
})
export class Payment {
  @Input() tripId!: number;
  @Input() price!: number;
  @Output() close = new EventEmitter<boolean>();

  private readonly tripService = inject(TripService);

  payNow(): void {
    if (!this.tripId) {
      this.close.emit(false);
      return;
    }
    this.tripService.completeTrip(this.tripId).subscribe({
      next: () => this.close.emit(true),
      error: () => this.close.emit(false)
    });
  }

  cancel(): void {
    this.close.emit(false);
  }
}
