import { Component, OnInit } from '@angular/core';
import { CookbookService } from '../cookbook.service';

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

  constructor(private cookbookService: CookbookService) {
    this.recipeList$ = this.cookbookService.recipeList$;
  }

  ngOnInit() {
  }

}
