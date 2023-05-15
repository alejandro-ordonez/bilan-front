import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModuleBarComponent } from './layout-module-bar.component';

describe('LayoutModuleBarComponent', () => {
  let component: LayoutModuleBarComponent;
  let fixture: ComponentFixture<LayoutModuleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutModuleBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutModuleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
