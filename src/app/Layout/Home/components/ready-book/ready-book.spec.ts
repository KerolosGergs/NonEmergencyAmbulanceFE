import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyBook } from './ready-book';

describe('ReadyBook', () => {
  let component: ReadyBook;
  let fixture: ComponentFixture<ReadyBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
