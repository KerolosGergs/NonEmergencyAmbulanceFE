import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApprovalRequests } from './pending-approval-requests';

describe('PendingApprovalRequests', () => {
  let component: PendingApprovalRequests;
  let fixture: ComponentFixture<PendingApprovalRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingApprovalRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingApprovalRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
