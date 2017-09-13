import { Component, OnInit } from '@angular/core';
import { UserService, UserStatus } from '../../../user/user.service';

@Component({
  selector: 'app-user-status',
  template: `
    <div *ngIf="userData$ | async as userData">
      <div [ngSwitch]="userData.status"
           class="user-info">

        <md-spinner *ngSwitchCase="UserStatus.pending"
                    color="accent"
                    class="header-spinner"></md-spinner>

        <a *ngSwitchCase="UserStatus.signedOut"
           routerLink="/sign-in"
           md-button>
          <md-icon>account_circle</md-icon>
          <span>Sign in</span>
        </a>

        <div *ngSwitchCase="UserStatus.authenticated"
             class="signed-in-user-container"
             [mdMenuTriggerFor]="menuPerson">

          <button md-button class="usernamelink">
            <app-avatar [user]="userData.user"></app-avatar>
            <div class="username">{{ userData.user.displayName }}</div>
          </button>

          <md-menu #menuPerson="mdMenu" xPosition="before">
            <button md-menu-item (click)="signOut($event)">
              <md-icon>exit_to_app</md-icon>
              <span>Sign Out</span>
            </button>
          </md-menu>

        </div>
      </div>
    </div>
  `,
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit {
  userData$;
  UserStatus = UserStatus;

  constructor(private userService: UserService) {
    this.userData$ = userService.userData$;
  }

  ngOnInit() {
  }

  signOut() {
    this.userService.signOut();
  }
}
