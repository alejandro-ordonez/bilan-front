import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActividadesCienciasNaturalesComponent } from './module-actividades-ciencias-naturales.component';

describe('ModuleActividadesCienciasNaturalesComponent', () => {
  let component: ModuleActividadesCienciasNaturalesComponent;
  let fixture: ComponentFixture<ModuleActividadesCienciasNaturalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleActividadesCienciasNaturalesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ModuleActividadesCienciasNaturalesComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
