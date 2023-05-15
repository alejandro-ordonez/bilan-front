import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActividadesLenguajeComponent } from './module-actividades-lenguaje.component';

describe('ModuleActividadesLenguajeComponent', () => {
  let component: ModuleActividadesLenguajeComponent;
  let fixture: ComponentFixture<ModuleActividadesLenguajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleActividadesLenguajeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleActividadesLenguajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
