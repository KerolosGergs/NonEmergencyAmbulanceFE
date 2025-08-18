import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paymnet } from './paymnet';

describe('Paymnet', () => {
  let component: Paymnet;
  let fixture: ComponentFixture<Paymnet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paymnet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paymnet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


  // templateUrl: './paymnet.html',
  // styleUrl: './paymnet.scss'
