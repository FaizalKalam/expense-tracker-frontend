import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService:UserService, private router:Router){}

  logUser={
    email:'',
    password:''
  }

  loginSubmit(){
    this.userService.logUser(this.logUser).subscribe({
      next:(res)=>{
        localStorage.setItem('token',res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Login error:", err);
        alert(err.error?.message || "Login failed");
      }
    });
  }
}
