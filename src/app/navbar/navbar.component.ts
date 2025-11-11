import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,RouterModule],
  //
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  opened = false;

  constructor(private router:Router,private dialog:MatDialog){}
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  openDialog() {
    this.dialog.open(UserProfileComponent,{
      width: '400px',
      height: 'auto'
    });
  }

}

