import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatTypesCardComponent } from './threat-types-card.component';

describe('ThreatTypesCardComponent', () => {
  let component: ThreatTypesCardComponent;
  let fixture: ComponentFixture<ThreatTypesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatTypesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatTypesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
