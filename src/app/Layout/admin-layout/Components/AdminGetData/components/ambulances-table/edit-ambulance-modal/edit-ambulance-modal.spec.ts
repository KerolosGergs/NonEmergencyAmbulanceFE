import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAmbulanceModal } from './edit-ambulance-modal';

describe('EditAmbulanceModal', () => {
  let component: EditAmbulanceModal;
  let fixture: ComponentFixture<EditAmbulanceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAmbulanceModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAmbulanceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
