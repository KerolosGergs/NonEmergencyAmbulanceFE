import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormComponent } from './payment';

describe('Paymnet', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


  // templateUrl: './paymnet.html',
  // styleUrl: './paymnet.scss'
