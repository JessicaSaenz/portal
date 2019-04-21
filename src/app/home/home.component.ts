import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  ResolveStart,
  ResolveEnd
} from '@angular/router'
import * as domHelper from './../_helpers'
import { MatSidenav } from '@angular/material';

import { AuthenticationService, UserService } from './../_services'
import { User } from './../_models';

interface UsersNode {
  name: string;
  children?: UsersNode[];
}

export interface UsersTree {
  username: string;
  company: string;
  rol: string;
  status: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser
  @ViewChild(MatSidenav) private sideNave: MatSidenav;  

  private transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router, private UserService: UserService, private authenticationService: AuthenticationService,
   ) {
    this.authenticationService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

  ngOnInit() {
   
  }
 
  isNavOver() {
    let isSm = window.matchMedia(`(max-width: 960px)`).matches;

    // Disable collapsed menu in small screen
    if (isSm && domHelper.hasClass(document.body, 'collapsed-menu')) {
      domHelper.removeClass(document.body, 'collapsed-menu');
    }
    return isSm;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
