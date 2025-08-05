import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatinetInfo } from './patinet-info';

describe('PatinetInfo', () => {
  let component: PatinetInfo;
  let fixture: ComponentFixture<PatinetInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatinetInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatinetInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
