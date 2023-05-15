import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroRetosComponent } from './intro-retos.component';

describe('IntroRetosComponent', () => {
  let component: IntroRetosComponent;
  let fixture: ComponentFixture<IntroRetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroRetosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroRetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
