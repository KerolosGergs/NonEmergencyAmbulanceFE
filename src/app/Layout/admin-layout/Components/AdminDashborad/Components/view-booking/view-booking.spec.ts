import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBooking } from './view-booking';

describe('ViewBooking', () => {
  let component: ViewBooking;
  let fixture: ComponentFixture<ViewBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
