import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaDemographicsComponent } from './india-demographics.component';

describe('IndiaDemographicsComponent', () => {
  let component: IndiaDemographicsComponent;
  let fixture: ComponentFixture<IndiaDemographicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiaDemographicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
