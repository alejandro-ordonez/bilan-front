import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDirectivoComponent } from './panel-directivo.component';

describe('PanelDirectivoComponent', () => {
  let component: PanelDirectivoComponent;
  let fixture: ComponentFixture<PanelDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelDirectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
