import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverHeader } from './driver-header';

describe('DriverHeader', () => {
  let component: DriverHeader;
  let fixture: ComponentFixture<DriverHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
