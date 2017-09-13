import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-cookbook',
  template: `
    <md-toolbar class="cookbook-toolbar mat-elevation-z6">

      <button md-button class="app-toolbar-menu" (click)="toggleSidenav()">
        <i class="material-icons app-toolbar-menu-icon">{{ listOpen ? 'chevron_left' : 'menu' }}</i>
        <span class="recipes-title">Recipes</span>
      </button>

      <span class="app-toolbar-filler"></span>

      <button md-mini-fab routerLink="/cookbook">
        <md-icon>note_add</md-icon>
      </button>

    </md-toolbar>

    <md-sidenav-container class="recipes-container">

      <md-sidenav #sidenav class="recipes-sidenav" [opened]="listOpen" mode="side">
        <app-recipe-list></app-recipe-list>
      </md-sidenav>

      <app-recipe-display class="recipes-sidenav-content"></app-recipe-display>

    </md-sidenav-container>
  `,
  styleUrls: ['./cookbook.component.scss']
})
export class CookbookComponent implements OnInit {
  @ViewChild('sidenav') sidenav;
  listOpen = true;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  get user() {
    return this.userService.user;
  }

  toggleSidenav() {
    this.listOpen = !this.listOpen;
    this.listOpen ? this.closeSidenav() : this.openSidenav();
  }

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
