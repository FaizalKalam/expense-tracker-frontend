import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUser } from '../interface/register-user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService:UserService, private router: Router){}

  regUser:RegisterUser={
    name:"",
    email:'',
    password:'',
    conPassword:''
  }

  //Reactive forms 
  regUserProfile=new FormGroup({
    name:new FormControl('',Validators.required)
  });

  regSubmit(){
    this.userService.regUser(this.regUser).subscribe({
      next:(res)=>{
        console.log("Registeration successfull",res);
        alert(res.message);

        this.regUser={
          name:"",
          email:'',
          password:'',
          conPassword:''
        };
        this.router.navigate(['/login']);
      },
      error:(err)=>{
        console.error("❌ Registration error:", err);
        alert(err.error?.message || "Registration failed");
      }
    });
    

  }

}
