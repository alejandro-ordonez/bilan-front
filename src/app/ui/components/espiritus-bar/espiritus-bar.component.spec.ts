import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspiritusBarComponent } from './espiritus-bar.component';

describe('EspiritusBarComponent', () => {
  let component: EspiritusBarComponent;
  let fixture: ComponentFixture<EspiritusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspiritusBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspiritusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
