import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';



@Component({
  selector: 'app-expense-form',
  imports: [FormsModule, CommonModule, MatButtonModule, MatDialogContent, MatDialogTitle,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {

  constructor(private expenseService: ExpenseService, private router: Router, private userService: UserService){}

  tags: string[] = ['Groceries', 'Bills'];  // initial values
  readonly separatorKeys = [ENTER] as const;

  expenseDetails={
    date:'',
    title:'',
    category:'',
    amount:0,
    userId:''
  };

  category='';
  categories:any=['Grocery', 'Travel','Entertainment'];

  expenses:any=[];

  addCategory(){
    if (this.category.trim()) {
      this.categories.push(this.category);
      this.category = '';
    }
  }

  submitExpense(){ 

    this.expenseService.addExpenseApi(this.expenseDetails).subscribe({
      next:(res)=>{
        this.expenseService.addExpense(res.expense);
        this.expenseDetails={
          date:'',
          title:'',
          category:'',
          amount:0,
          userId:''
        };
        //this.router.navigate(['/dashboard']);
      },error:(err) =>{
        console.error("Error adding expense:", err);
        alert("Something went wrong while adding your expense");
      }
    });
  }


  add(event: any) {
    const value = (event.value || '').trim();
    if (value) {
      this.categories.push(value);
    }
    event.chipInput?.clear();
  }

  remove(tag: string) {
    const index = this.categories.indexOf(tag);
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }
}
