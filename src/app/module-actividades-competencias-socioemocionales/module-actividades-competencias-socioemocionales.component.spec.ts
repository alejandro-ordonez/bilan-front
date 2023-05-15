import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActividadesCompetenciasSocioemocionalesComponent } from './module-actividades-competencias-socioemocionales.component';

describe('ModuleActividadesCompetenciasSocioemocionalesComponent', () => {
  let component: ModuleActividadesCompetenciasSocioemocionalesComponent;
  let fixture: ComponentFixture<ModuleActividadesCompetenciasSocioemocionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleActividadesCompetenciasSocioemocionalesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ModuleActividadesCompetenciasSocioemocionalesComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
