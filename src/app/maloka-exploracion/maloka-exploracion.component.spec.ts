import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalokaExploracionComponent } from './maloka-exploracion.component';

describe('MalokaExploracionComponent', () => {
  let component: MalokaExploracionComponent;
  let fixture: ComponentFixture<MalokaExploracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MalokaExploracionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MalokaExploracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
