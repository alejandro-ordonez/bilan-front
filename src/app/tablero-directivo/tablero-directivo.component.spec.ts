import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroDirectivoComponent } from './tablero-directivo.component';

describe('TableroDirectivoComponent', () => {
  let component: TableroDirectivoComponent;
  let fixture: ComponentFixture<TableroDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroDirectivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
