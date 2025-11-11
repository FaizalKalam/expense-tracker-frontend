import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { CommonModule, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { UserService } from '../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-display',
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    DatePipe,
    CurrencyPipe],
  templateUrl: './expense-display.component.html',
  styleUrl: './expense-display.component.css'
})
export class ExpenseDisplayComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private expenseService: ExpenseService, private userService: UserService, private changeDetectorRef: ChangeDetectorRef) { }

  displayedColumns: string[] = ['date', 'item', 'category', 'amount'];
  dataSource = new MatTableDataSource<any>([]);
  private subscriptions = new Subscription();

  @ViewChild(MatSort) sort!: MatSort;
  // NOTE: MatPaginator is optional on ViewChild if it's hidden by *ngIf initially
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  currentUserId: string = '';
  isLoading:boolean=true;

  ngOnInit(): void {
    this.subscriptions.add(
      this.userService.getDashboard().subscribe({
        next: (res) => {
          this.currentUserId = res.user._id;
          console.log('Current user ID:', this.currentUserId);
          
          // Fetch expenses from backend
          this.fetchExpenses();
        },
        error: (err) => {
          console.error('User fetch error', err);
          this.isLoading=false;
        }
      })
    );

    // Subscribe to expense updates
    this.subscriptions.add(
      this.expenseService.expenses$.subscribe((exp) => {
        console.log('Expenses updated:', exp);
        this.filterUserExpenses(exp);
        
        // FIX: Defer the table setup until the view (Paginator/Sort) is guaranteed to be rendered
        // after the *ngIf condition is met by the updated data/loading state.
        Promise.resolve().then(() => {
          this.setupTableFeatures();
        });
      })
    );
  }

  // NOTE: ngAfterViewInit is now only here for compliance, the core setup logic
  // must happen in the subscription due to the asynchronous data load and *ngIf.
  ngAfterViewInit(): void {
    // We intentionally removed the call to this.setupTableFeatures() here 
    // because it runs too early when the paginator is not yet in the DOM.
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  private fetchExpenses(): void {
    this.isLoading=true;
    this.expenseService.getExpensesApi().subscribe({
      next: (res) => {
        console.log('Expenses API response:', res);
        if (res && Array.isArray(res)) {
          this.expenseService.setExpenses(res);
        } else if (res && Array.isArray(res.expenses)) {
          this.expenseService.setExpenses(res.expenses);
        } else {
          console.error('Unexpected response format:', res);
          this.expenseService.setExpenses([]);
        }
        this.isLoading=false;
      },
      error: (err) => {
        console.error('Expense fetch error', err);
        this.expenseService.setExpenses([]);
        this.isLoading=false;
      }
    });
  }

  private filterUserExpenses(expenses: any[]): void {
    if (!Array.isArray(expenses)) {
      console.warn('Expenses is not an array:', expenses);
      this.dataSource.data = [];
      return;
    }

    if (!this.currentUserId) {
      console.warn('No current user ID available');
      this.dataSource.data = [];
      return;
    }

    const userExpenses = expenses
      .filter(e => e && e.userId)
      .filter(e => e.userId === this.currentUserId);

    console.log('Filtered user expenses:', userExpenses);
    this.dataSource.data = userExpenses;
  }


  private setupTableFeatures():void{
    // The paginator/sort must be assigned AFTER the view has rendered.
    // If the data is empty, they will be undefined, so we check first.
    if(this.sort){
      this.dataSource.sort = this.sort;
    }
    
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
      // Also, always reset to the first page when new data arrives
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalExpense(): number {
    return this.dataSource.data.reduce((sum, exp) => sum + (exp.amount || 0), 0);
  }

  applyFilter(event: Event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}













