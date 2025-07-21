import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceForm } from './ambulance-form';

describe('AmbulanceForm', () => {
  let component: AmbulanceForm;
  let fixture: ComponentFixture<AmbulanceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbulanceForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbulanceForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
