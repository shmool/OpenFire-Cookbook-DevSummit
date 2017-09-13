import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserStatusComponent } from './header/user-status/user-status.component';
import { MaterialModule } from '../common/material/material.module';
import { FormsModule } from '@angular/forms';
import { CookbookModule } from './cookbook/cookbook.module';
import { SignInWithEmailComponent } from './sign-in/sign-in-with-email/sign-in-with-email.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SignInWithProviderComponent } from './sign-in/sign-in-with-provider/sign-in-with-provider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    CookbookModule
  ],
  declarations: [
    HeaderComponent,
    SignInComponent,
    UserStatusComponent,
    SignInWithEmailComponent,
    SignInWithProviderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class MainModule { }
