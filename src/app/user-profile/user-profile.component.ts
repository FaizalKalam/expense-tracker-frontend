import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [ MatButtonModule,MatDialogActions,MatDialogContent,MatDialogClose,MatDialogTitle,FormsModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService, private router:Router) { }

  userName='';
  userEmail='';
  userId='';
  isEditing=false;

  ngOnInit(): void {
    // Call backend to get dashboard data
    this.userService.getDashboard().subscribe({
      next: (res) => {
        this.userName=res.user.name,
        this.userEmail=res.user.email,
        this.userId=res.user._id
      },
      error: (err) => {
        console.error('Error fetching dashboard:', err);
      }
    });
  }

  saveChanges(){
    this.userService.editUser(this.userId,{
      name:this.userName,
      email:this.userEmail
    }).subscribe({
      next:()=>{
        this.isEditing=false;
      },
      error:(err)=>{
        console.log('Error updating user',err);
      }
    });
  }
  
}
