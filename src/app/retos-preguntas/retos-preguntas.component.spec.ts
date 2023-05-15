import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetosPreguntasComponent } from './retos-preguntas.component';

describe('RetosPreguntasComponent', () => {
  let component: RetosPreguntasComponent;
  let fixture: ComponentFixture<RetosPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetosPreguntasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetosPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
