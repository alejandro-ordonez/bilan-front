import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalokaEspiritualComponent } from './maloka-espiritual.component';

describe('MalokaEspiritualComponent', () => {
  let component: MalokaEspiritualComponent;
  let fixture: ComponentFixture<MalokaEspiritualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MalokaEspiritualComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MalokaEspiritualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
