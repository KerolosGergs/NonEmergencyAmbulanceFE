import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDriverModal } from './edit-driver-modal';

describe('EditDriverModal', () => {
  let component: EditDriverModal;
  let fixture: ComponentFixture<EditDriverModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDriverModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDriverModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
