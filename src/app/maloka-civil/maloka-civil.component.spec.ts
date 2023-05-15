import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalokaCivilComponent } from './maloka-civil.component';

describe('MalokaCivilComponent', () => {
  let component: MalokaCivilComponent;
  let fixture: ComponentFixture<MalokaCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MalokaCivilComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MalokaCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
