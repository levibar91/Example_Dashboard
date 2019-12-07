import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeveritiesCardComponent } from './severities-card.component';

describe('SeveritiesCardComponent', () => {
  let component: SeveritiesCardComponent;
  let fixture: ComponentFixture<SeveritiesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeveritiesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeveritiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
