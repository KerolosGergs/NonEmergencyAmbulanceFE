import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfo } from './nurse-info';

describe('NurseInfo', () => {
  let component: NurseInfo;
  let fixture: ComponentFixture<NurseInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
