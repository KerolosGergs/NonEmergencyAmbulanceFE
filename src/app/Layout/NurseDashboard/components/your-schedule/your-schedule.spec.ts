import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSchedule } from './your-schedule';

describe('YourSchedule', () => {
  let component: YourSchedule;
  let fixture: ComponentFixture<YourSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourSchedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
