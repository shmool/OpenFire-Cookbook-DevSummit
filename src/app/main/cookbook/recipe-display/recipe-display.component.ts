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
                     (save)="saveRecipe($event)"></app-recipe-card>

    <ng-template #pleaseSignIn>
      <md-error>Please sign in to add and edit recipes</md-error>
    </ng-template>
  `,
  styleUrls: ['./recipe-display.component.scss']
})
export class RecipeDisplayComponent implements OnInit {
  recipe$;
  user$;

  constructor(
    private cookbookService: CookbookService,
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user$ = this.userService.userData$;

    this.route.params.forEach(param => {
      // async pipe unsubscribes when the ref changes
      this.recipe$ = this.cookbookService.getRecipe(param.id);
    });
  }

  saveRecipe(recipe) {
    return recipe.id
      ? this.cookbookService.saveRecipe(recipe)
      : this.cookbookService.saveNewRecipe(recipe)
             .then(res => {
               if (res) {
                 this.router.navigate(['/cookbook', res.key]);
        }
      });
  }

}
