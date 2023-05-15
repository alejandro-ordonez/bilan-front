import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotemSpecialComponent } from './totem-special.component';

describe('TotemSpecialComponent', () => {
  let component: TotemSpecialComponent;
  let fixture: ComponentFixture<TotemSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotemSpecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotemSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
