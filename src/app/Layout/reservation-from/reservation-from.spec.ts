import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFrom } from './reservation-from';

describe('ReservationFrom', () => {
  let component: ReservationFrom;
  let fixture: ComponentFixture<ReservationFrom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationFrom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFrom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
