import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTypesCardComponent } from './source-types-card.component';

describe('SourceTypesCardComponent', () => {
  let component: SourceTypesCardComponent;
  let fixture: ComponentFixture<SourceTypesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceTypesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTypesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
