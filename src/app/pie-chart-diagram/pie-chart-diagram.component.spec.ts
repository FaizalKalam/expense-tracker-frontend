import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartDiagramComponent } from './pie-chart-diagram.component';

describe('PieChartDiagramComponent', () => {
  let component: PieChartDiagramComponent;
  let fixture: ComponentFixture<PieChartDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
