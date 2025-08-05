import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatintLayout } from './patint-layout';

describe('PatintLayout', () => {
  let component: PatintLayout;
  let fixture: ComponentFixture<PatintLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatintLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatintLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
