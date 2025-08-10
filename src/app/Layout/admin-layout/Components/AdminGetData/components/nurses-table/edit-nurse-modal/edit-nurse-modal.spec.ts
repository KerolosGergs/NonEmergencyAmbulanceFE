import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNurseModal } from './edit-nurse-modal';

describe('EditNurseModal', () => {
  let component: EditNurseModal;
  let fixture: ComponentFixture<EditNurseModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNurseModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNurseModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
