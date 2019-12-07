import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkTypeThreatComponent } from './network-type-threat.component';

describe('NetworkTypeThreatComponent', () => {
  let component: NetworkTypeThreatComponent;
  let fixture: ComponentFixture<NetworkTypeThreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkTypeThreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkTypeThreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
