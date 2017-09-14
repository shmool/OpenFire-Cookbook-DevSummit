import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/first';

import * as firebase from 'firebase/app';

const providers = {
  google: firebase.auth.GoogleAuthProvider,
  facebook: firebase.auth.FacebookAuthProvider,
  twitter: firebase.auth.TwitterAuthProvider,
  github: firebase.auth.GithubAuthProvider,
  phone: firebase.auth.PhoneAuthProvider
};

export enum UserStatus {
  pending = 'pending',
  signedOut = 'signedOut',
  authenticated = 'authenticated'
}

// mock
const mockUserFranco = {
  displayName: 'Franco',
  email: 'franco@example.com',
  uid: '123',
  photoURL: '/assets/mock/Franco.png',
  avatarColor: '#aa7733'
};

const mockUserZiggi = {
  displayName: 'Ziggi',
  email: 'ziggi@example.com',
  uid: '456',
  photoURL: '/assets/mock/Ziggi.png',
  avatarColor: '#aa33ff'
};

const mockUsers = {
  '123': mockUserFranco,
  '456': mockUserZiggi
};

@Injectable()
export class UserService {
  user: User;
  private pending$ = new BehaviorSubject({ status: UserStatus.pending, user: null });
  private userAuth$;
  userData$;
  authError: any = null;
  uid$;

  constructor(private afAuth: AngularFireAuth) {
    this.enterPending();
    this.userAuth$ = this.afAuth.authState.map(authData => {
      return {
        status: authData ? UserStatus.authenticated : UserStatus.signedOut,
        user: authData
      };
    });
    // notice! it makes a difference who's merging who!
    this.userData$ = this.pending$.merge(this.userAuth$)
      .do(userData => {
        if (userData.status !== UserStatus.pending) {
          this.user = userData.user || null;
        }
      });

    this.uid$ = this.userAuth$.map(userAuth => userAuth.user && userAuth.user.uid);
  }

  enterPending() {
    this.pending$.next({ status: UserStatus.pending, user: this.user });
  }

  signOut() {
    this.enterPending();
    this.afAuth.auth.signOut();
  }

  handleAuthError(err) {
    this.authError = err;
    this.pending$.next({ status: UserStatus.signedOut, user: null });
  }

  signInWithProvider(provider) {
    this.enterPending();
    this.afAuth.auth.signInWithPopup(new providers[provider]())
      .catch(err => this.handleAuthError(err));
  }

  signInWithEmail(email, password) {
    this.enterPending();
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(err => this.handleAuthError(err));
  }

  signUp(email, password, displayName) {
    this.enterPending();
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userInfo => userInfo.updateProfile({ displayName }))
      .catch(err => this.handleAuthError(err));
  }
}
