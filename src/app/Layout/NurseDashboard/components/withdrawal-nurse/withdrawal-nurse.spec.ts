import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalNurse } from './withdrawal-nurse';

describe('WithdrawalNurse', () => {
  let component: WithdrawalNurse;
  let fixture: ComponentFixture<WithdrawalNurse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawalNurse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalNurse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
