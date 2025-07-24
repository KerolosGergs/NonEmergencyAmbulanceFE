import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceFormComponent } from './ambulance-form';

describe('AmbulanceForm', () => {
  let component: AmbulanceFormComponent;
  let fixture: ComponentFixture<AmbulanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbulanceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbulanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
