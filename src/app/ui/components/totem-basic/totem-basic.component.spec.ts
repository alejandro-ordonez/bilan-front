import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotemBasicComponent } from './totem-basic.component';

describe('TotemBasicComponent', () => {
  let component: TotemBasicComponent;
  let fixture: ComponentFixture<TotemBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotemBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotemBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
