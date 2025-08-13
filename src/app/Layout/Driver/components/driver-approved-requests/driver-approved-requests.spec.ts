import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverApprovedRequests } from './driver-approved-requests';

describe('DriverApprovedRequests', () => {
  let component: DriverApprovedRequests;
  let fixture: ComponentFixture<DriverApprovedRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverApprovedRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverApprovedRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
