import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelColegioComponent } from './panel-colegio.component';

describe('PanelColegioComponent', () => {
  let component: PanelColegioComponent;
  let fixture: ComponentFixture<PanelColegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelColegioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
