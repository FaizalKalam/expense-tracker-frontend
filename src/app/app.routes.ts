import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';

// export const routes: Routes = [
//     {
//         path:"register",
//         component:RegisterComponent
//     },
//     { path: '', redirectTo: '/login', pathMatch: 'full' },
//     { path: 'login', component: LoginComponent },
//     { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard],children:[
        
//     ] },{
//         path:'addExpense',
//         component:ExpenseFormComponent,
//         canActivate:[authGuard]
//     },
//     {
//         path: 'userProfile',
//         component: UserProfileComponent,
//         canActivate:[authGuard]
//     }
    
// ];
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  
    // 👇 Layout shell with navbar + sidebar
    {
      path: '',
      component: NavbarComponent,
      canActivate: [authGuard],
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'addExpense', component: ExpenseFormComponent },
        { path: 'userProfile', component: UserProfileComponent },
      ]
    },
  
    // Wildcard for unknown routes
    { path: '**', redirectTo: 'dashboard' }
  ];
