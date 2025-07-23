import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseLayout } from './nurse-layout';

describe('NurseLayout', () => {
  let component: NurseLayout;
  let fixture: ComponentFixture<NurseLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
