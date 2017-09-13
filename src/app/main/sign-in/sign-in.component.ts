import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-sign-in',
  template: `
    <div class="sign-in">

      <h1>Sign in</h1>

      <md-error *ngIf="signInError">{{ signInError.message }}</md-error>

      <div fxLayout="column" fxLayout.gt-xs="row" fxLayoutAlign="center center" fxLayoutAlign.gt-xs="center top">

        <app-sign-in-with-email></app-sign-in-with-email>

        <h2>OR</h2>

        <app-sign-in-with-provider></app-sign-in-with-provider>

      </div>
    </div>
  `,
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  get signInError() {
    return this.userService.authError;
  }

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

}
