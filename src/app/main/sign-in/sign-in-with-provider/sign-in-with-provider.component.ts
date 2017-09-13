import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sign-in-with-provider',
  template: `
    <md-card fxLayout="column">
      <ul>
        <li *ngFor="let provider of providers">
          <button class="auth"
                  [ngClass]="provider"
                  md-raised-button
                  (click)="signInWithProvider(provider)">
            <span class="auth-img-wrapper"><img [src]="'assets/icons/auth/' + provider + '.svg'"></span>
            <span class="auth-button-text">Sign in with {{ provider | titlecase }}</span>
          </button>

        </li>
      </ul>
    </md-card>
  `,
  styleUrls: ['./sign-in-with-provider.component.scss']
})
export class SignInWithProviderComponent implements OnInit {
  providers = environment.authProviders;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  signInWithProvider(provider) {
    return this.userService.signInWithProvider(provider);
  }

}
