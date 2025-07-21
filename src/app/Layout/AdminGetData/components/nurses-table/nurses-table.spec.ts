import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursesTable } from './nurses-table';

describe('NursesTable', () => {
  let component: NursesTable;
  let fixture: ComponentFixture<NursesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NursesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
