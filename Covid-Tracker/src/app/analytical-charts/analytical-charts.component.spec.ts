import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalChartsComponent } from './analytical-charts.component';

describe('AnalyticalChartsComponent', () => {
  let component: AnalyticalChartsComponent;
  let fixture: ComponentFixture<AnalyticalChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticalChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticalChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
