import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NHeader } from './n-header';

describe('NHeader', () => {
  let component: NHeader;
  let fixture: ComponentFixture<NHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
