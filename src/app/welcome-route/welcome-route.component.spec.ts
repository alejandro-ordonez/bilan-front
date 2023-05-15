import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeRouteComponent } from './welcome-route.component';

describe('WelcomeRouteComponent', () => {
  let component: WelcomeRouteComponent;
  let fixture: ComponentFixture<WelcomeRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
