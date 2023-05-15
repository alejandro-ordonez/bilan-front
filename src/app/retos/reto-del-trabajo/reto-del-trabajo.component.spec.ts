import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoDelTrabajoComponent } from './reto-del-trabajo.component';

describe('RetoDelTrabajoComponent', () => {
  let component: RetoDelTrabajoComponent;
  let fixture: ComponentFixture<RetoDelTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetoDelTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetoDelTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
