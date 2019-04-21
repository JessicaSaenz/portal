import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { AuthenticationService } from './../../_services';
import { User } from './../../_models';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  isExpanded = true;
  isShowing = false;
  showCompaniesSubMenu: boolean = false;
  showUsersSubMenu: boolean = false;
  showexampleSubMenu: boolean = false;
  isAdmin: Boolean = false;
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

  ngOnInit() {    
  
   
  }
 

  logout() {
    this.authenticationService.signout();
    this.router.navigate(['/signin']);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
