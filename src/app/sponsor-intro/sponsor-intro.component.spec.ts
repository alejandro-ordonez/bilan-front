import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorIntroComponent } from './sponsor-intro.component';

describe('SponsorIntroComponent', () => {
  let component: SponsorIntroComponent;
  let fixture: ComponentFixture<SponsorIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SponsorIntroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
