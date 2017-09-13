import { Component, OnInit } from '@angular/core';
import { CookbookService } from '../cookbook.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../user/user.service';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-recipe-display',
  template: `
    <app-recipe-card *ngIf="(recipe$ | async) || (user$ | async)?.user; else pleaseSignIn"
                     [recipe]="recipe$ | async"
                     [recipeOwner]="recipeOwner$ | async"
                     [writeProtected]="recipeWriteProtected$ | async"
                     (save)="saveRecipe($event)"></app-recipe-card>

    <ng-template #pleaseSignIn>
      <md-error>Please sign in to add and edit recipes</md-error>
    </ng-template>
  `,
  styleUrls: ['./recipe-display.component.scss']
})
export class RecipeDisplayComponent implements OnInit {
  recipe$;
  recipeWriteProtected$;
  user$;
  recipeOwner$;

  constructor(
    private cookbookService: CookbookService,
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipe$ = this.cookbookService.currentRecipe$;
    this.user$ = this.userService.userData$;
    this.recipeWriteProtected$ =
      this.recipe$.withLatestFrom(this.user$, (recipe, userDetails) => {
        return !userDetails.user || userDetails.user && recipe && recipe.uid !== userDetails.user.uid;
      });

    this.recipeOwner$ = this.recipe$.switchMap(recipe => {
      return this.userService.getUser(recipe && recipe.uid);
    });
    this.route.params.forEach(param => {
      this.cookbookService.getRecipe(param.id);
    });
  }

  saveRecipe(recipe) {
    this.cookbookService.saveRecipe(recipe)
      .then(res => {
        this.router.navigate(['/cookbook', res.key]);
      });
  }

}
