import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseRequests } from './nurse-requests';

describe('NurseRequests', () => {
  let component: NurseRequests;
  let fixture: ComponentFixture<NurseRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
