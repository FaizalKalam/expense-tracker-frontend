import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ExpenseDisplayComponent } from '../expense-display/expense-display.component';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { PieChartDiagramComponent } from '../pie-chart-diagram/pie-chart-diagram.component';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-dashboard',
  imports: [ExpenseDisplayComponent,RouterModule,MatButtonModule,PieChartDiagramComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  message: string = '';
  userName='';
  userEmail='';
  userId='';

  constructor(private userService: UserService, private router:Router, private dialog:MatDialog) { }

  ngOnInit(): void {
    // Call backend to get dashboard data
    this.userService.getDashboard().subscribe({
      next: (res) => {
        this.message = res.message; // "Welcome to the dashboard!"
        this.userName=res.user.name,
        this.userEmail=res.user.email,
        this.userId=res.user._id
      },
      error: (err) => {
        console.error('Error fetching dashboard:', err);
        this.message = 'Could not load dashboard.';
      }
    });
  }

  addExpense(){
    //this.router.navigate(['/addExpense']);
    this.dialog.open(ExpenseFormComponent,{
      width: 'auto',
      height: 'auto',
      backdropClass: 'blurred-backdrop', // custom background blur
      panelClass: 'expense-dialog'
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}