import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoDeMagiaComponent } from './reto-de-magia.component';

describe('RetoDeMagiaComponent', () => {
  let component: RetoDeMagiaComponent;
  let fixture: ComponentFixture<RetoDeMagiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetoDeMagiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetoDeMagiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
