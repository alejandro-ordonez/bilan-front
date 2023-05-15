import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtefactoCardComponent } from './artefacto-card.component';

describe('ArtefactoCardComponent', () => {
  let component: ArtefactoCardComponent;
  let fixture: ComponentFixture<ArtefactoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtefactoCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtefactoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
