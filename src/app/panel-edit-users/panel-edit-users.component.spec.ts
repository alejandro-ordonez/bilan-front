import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEditUsersComponent } from './panel-edit-users.component';

describe('PanelEditUsersComponent', () => {
  let component: PanelEditUsersComponent;
  let fixture: ComponentFixture<PanelEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelEditUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
