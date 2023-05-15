import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActividadesMatematicasComponent } from './module-actividades-matematicas.component';

describe('ModuleActividadesMatematicasComponent', () => {
  let component: ModuleActividadesMatematicasComponent;
  let fixture: ComponentFixture<ModuleActividadesMatematicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleActividadesMatematicasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleActividadesMatematicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
