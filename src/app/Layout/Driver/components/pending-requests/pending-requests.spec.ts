import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPendingRequests } from './pending-requests';

describe('DriverPendingRequests', () => {
  let component: DriverPendingRequests;
  let fixture: ComponentFixture<DriverPendingRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverPendingRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverPendingRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
