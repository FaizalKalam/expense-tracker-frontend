import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }
//https://expense-tracker-backend-k359.onrender.com
  private apiUri= "https://expense-tracker-backend-k359.onrender.com/api/expense";

  private expenseSource = new BehaviorSubject<any[]>([]);
  expenses$= this.expenseSource.asObservable();

  addExpenseApi(expense:any):Observable<any>{
    return this.http.post<any>(`${this.apiUri}/addExpense`,expense);
  }

  getExpensesApi():Observable<any>{
    return this.http.get<any>(`${this.apiUri}/getExpenses`);
  }

  addExpense(expense:any){
    // const currentExpense = this.expenseSource.value;
    // this.expenseSource.next([...currentExpense,expense]);


//     const currentExpenses = Array.isArray(this.expenseSource.value) 
//     ? this.expenseSource.value 
//     : [];
// this.expenseSource.next([...currentExpenses, expense]);


const currentExpenses = Array.isArray(this.expenseSource.value) ? this.expenseSource.value : [];
this.expenseSource.next([...currentExpenses, expense]);
  }

    // Safe method to update BehaviorSubject
    setExpenses(expenses: any[]) {
  // Convert single object to array if needed
  const arr = Array.isArray(expenses) ? expenses : [expenses];
  this.expenseSource.next(arr);
    }
  
}
