import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingService } from './routing.service';
import { SignInComponent } from '../main/sign-in/sign-in.component';
import { CookbookComponent } from '../main/cookbook/cookbook.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'cookbook',
    children: [
      { path: '', component: CookbookComponent },
      { path: ':id', component: CookbookComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/cookbook',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*, {enableTracing: true}*/)],
  exports: [RouterModule],
  providers: [RoutingService]
})
export class AppRoutingModule {
}
