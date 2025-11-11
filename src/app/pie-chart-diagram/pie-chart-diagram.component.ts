import { Component, OnInit } from '@angular/core';
//import { NgChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { ExpenseService } from '../services/expense.service';
import { ChartType, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pie-chart-diagram',
  imports: [BaseChartDirective,],
  templateUrl: './pie-chart-diagram.component.html',
  styleUrl: './pie-chart-diagram.component.css'
})
export class PieChartDiagramComponent implements OnInit {
  // ✅ type explicitly as ChartType = 'pie'
  pieChartType: ChartType = 'pie';

  pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      { data: [] }
    ]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top', display: false },
      title: { display: false, text: 'Expenses by Category' }
    }
  };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.expenses$.subscribe(expenses => {
      // 1️⃣ Ensure expenses is an array
      if (!Array.isArray(expenses)) return;
    
      const categoryTotals: Record<string, number> = {};
    
      // 2️⃣ Loop safely
      expenses.forEach(exp => {
        if (!exp || !exp.category || !exp.amount) return; // skip invalid
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
      });

      this.pieChartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
          { 
            data: Object.values(categoryTotals),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
            ] // ✅ nice colors
          }
        ]
      };
    });
  }
}