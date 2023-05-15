import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleBarComponent } from './module-bar.component';

describe('ModuleBarComponent', () => {
  let component: ModuleBarComponent;
  let fixture: ComponentFixture<ModuleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
