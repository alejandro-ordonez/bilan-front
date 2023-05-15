import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionIntroComponent } from './description-intro.component';

describe('DescriptionIntroComponent', () => {
  let component: DescriptionIntroComponent;
  let fixture: ComponentFixture<DescriptionIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionIntroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
