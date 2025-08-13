import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalDriver } from './withdrawal-driver';

describe('WithdrawalDriver', () => {
  let component: WithdrawalDriver;
  let fixture: ComponentFixture<WithdrawalDriver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawalDriver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalDriver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
