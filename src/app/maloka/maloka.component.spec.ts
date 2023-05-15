import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalokaComponent } from './maloka.component';

describe('MalokaComponent', () => {
  let component: MalokaComponent;
  let fixture: ComponentFixture<MalokaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MalokaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MalokaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
