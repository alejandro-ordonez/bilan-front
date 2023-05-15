import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloTeacherComponent } from './modulo-teacher.component';

describe('ModuloTeacherComponent', () => {
  let component: ModuloTeacherComponent;
  let fixture: ComponentFixture<ModuloTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloTeacherComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
