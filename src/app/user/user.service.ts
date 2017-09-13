import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../shared/user.interface';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';

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
  private pending$ = new BehaviorSubject({ status: UserStatus.pending });
  private userAuth$ = new BehaviorSubject({ status: UserStatus.signedOut, user: null });
  userData$;
  authError: any = null;

  constructor() {
    this.enterPending();
    this.userData$ = this.userAuth$.merge(this.pending$);
    // mock user signed-out
    setTimeout(() => {
      this.userAuth$.next({ status: UserStatus.signedOut, user: null });
    }, 2000);
  }

  enterPending() {
    this.pending$.next({ status: UserStatus.pending });
  }

  signOut() {
    // mock
    this.enterPending();
    setTimeout(() => {
      this.userAuth$.next({ status: UserStatus.signedOut, user: null });
    }, 2000);
  }

  signInWithProvider(provider) {
    // mock
    this.enterPending();
    setTimeout(() => {
      this.userAuth$.next({ status: UserStatus.authenticated, user: mockUserZiggi });
    }, 2000);
  }

  signInWithEmail(email, password) {
    this.enterPending();
    setTimeout(() => {
      this.userAuth$.next({ status: UserStatus.authenticated, user: mockUserFranco });
    }, 2000);
  }

  signUp(email, password, displayName) {
    const uid = Math.floor(Math.random() * 1000) + '';
    const mockUser = {
      email,
      displayName,
      avatarColor: '#aa33ff',
      uid
    };
    mockUsers[uid] = mockUser;
    this.enterPending();
    setTimeout(() => {
      this.userAuth$.next({ status: UserStatus.authenticated, user: mockUser });
    }, 2000);
  }

  getUid() {
    const userData = this.userData$.getValue();
    return userData.user && userData.user.uid;
  }

  getUser(uid) {
    return new BehaviorSubject(uid && mockUsers[uid]);
  }
}
