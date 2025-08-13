import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseTrip } from './nurse-trip';

describe('NurseTrip', () => {
  let component: NurseTrip;
  let fixture: ComponentFixture<NurseTrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseTrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseTrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
