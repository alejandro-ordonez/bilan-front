import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBilanComponent } from './about-bilan.component';

describe('AboutBilanComponent', () => {
  let component: AboutBilanComponent;
  let fixture: ComponentFixture<AboutBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutBilanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
