import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoDeValentiaComponent } from './reto-de-valentia.component';

describe('RetoDeValentiaComponent', () => {
  let component: RetoDeValentiaComponent;
  let fixture: ComponentFixture<RetoDeValentiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetoDeValentiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetoDeValentiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
