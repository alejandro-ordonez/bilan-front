import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoDePlaneacionComponent } from './reto-de-planeacion.component';

describe('RetoDePlaneacionComponent', () => {
  let component: RetoDePlaneacionComponent;
  let fixture: ComponentFixture<RetoDePlaneacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetoDePlaneacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetoDePlaneacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
