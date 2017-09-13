import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserStatus } from '../user/user.service';

@Injectable()
export class RoutingService {
  previousAuthStatus;

  constructor(private router: Router, private userService: UserService) {
    userService.userData$.subscribe(authState => {
      if (router.isActive('/sign-in', true) && authState.status === UserStatus.authenticated) {
        router.navigate(['']);
      }
      if ((this.previousAuthStatus === UserStatus.authenticated) && authState.status === UserStatus.signedOut) {
        router.navigate(['/sign-in']);
      }
      if (authState.status !== UserStatus.pending) {
        this.previousAuthStatus = authState.status;
      }
    });
  }
}
