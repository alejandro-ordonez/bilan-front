import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEvaluacionComponent } from './panel-evaluacion.component';

describe('PanelEvaluacionComponent', () => {
  let component: PanelEvaluacionComponent;
  let fixture: ComponentFixture<PanelEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelEvaluacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
