import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActividadesCompetenciasCiudadanasComponent } from './module-actividades-competencias-ciudadanas.component';

describe('ModuleActividadesCompetenciasCiudadanasComponent', () => {
  let component: ModuleActividadesCompetenciasCiudadanasComponent;
  let fixture: ComponentFixture<ModuleActividadesCompetenciasCiudadanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleActividadesCompetenciasCiudadanasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ModuleActividadesCompetenciasCiudadanasComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
