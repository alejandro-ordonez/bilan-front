import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidoTeacherComponent } from './bienvenido-teacher.component';

describe('BienvenidoTeacherComponent', () => {
  let component: BienvenidoTeacherComponent;
  let fixture: ComponentFixture<BienvenidoTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BienvenidoTeacherComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidoTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
