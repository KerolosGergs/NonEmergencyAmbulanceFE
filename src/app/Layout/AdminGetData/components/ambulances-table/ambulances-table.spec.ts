import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulancesTable } from './ambulances-table';

describe('AmbulancesTable', () => {
  let component: AmbulancesTable;
  let fixture: ComponentFixture<AmbulancesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbulancesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbulancesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
