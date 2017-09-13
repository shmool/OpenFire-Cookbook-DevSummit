import { Component, OnInit } from '@angular/core';
import { CookbookService } from '../cookbook.service';
import { UserService, UserStatus } from '../../../user/user.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-recipe-list',
  template: `
    <md-list>
      <md-list-item *ngFor="let recipe of recipeList$ | async; let i = index"
                    [routerLink]="['/cookbook', recipe.id]"
                    [ngClass]="{'current-user': recipe.ofCurrentUser}">
        <h4 md-line>{{ recipe.title }}</h4>
      </md-list-item>
    </md-list>
  `,
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipeList$;

  constructor(private cookbookService: CookbookService, private userService: UserService) {
  }

  ngOnInit() {
    this.recipeList$ = Observable.combineLatest(
      this.cookbookService.recipeList$,
      this.userService.userData$.filter(userData => userData.status !== UserStatus.pending),
      (recipeList, userData) => {
        return recipeList.map(recipe => {
          recipe.ofCurrentUser = recipe.uid === (userData && userData.user && userData.user.uid);
          return recipe;
        });
      });
  }

}
