import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

// mock
const mockRecipeList = [
  {
    id: '3',
    title: 'Poyke',
    type: '',
    uid: '123',
    ingredients: [
      {
        name: 'water',
        quantity: '5 liters'
      }, {
        name: 'various vegetables',
        quantity: '5 kg'
      }, {
        name: 'coconut cream',
        quantity: '1/2 liter'
      }
    ],
    instructions: `Cut the vegetables to cubes, put in the Poyke pot with all the water and the coconut cream.
Cook in the camp fire for at least an hour.`
  },
  {
    id: '5',
    title: 'Hot Potatoes',
    type: '',
    uid: '456',
    ingredients: [
      {
        name: 'potatoes',
        quantity: '3 for each person'
      }
    ],
    instructions: 'Wrap the potatoes in tin foil, and put them inside the fire for half an hour.',
  }
];

@Injectable()
export class CookbookService {
  recipeList$: Observable<any>;
  private mockRecipeList$ = new BehaviorSubject(mockRecipeList);

  constructor(/* todo: for mock */ private userService: UserService) {
    this.initRecipeList();
  }

  initRecipeList() {
    this.recipeList$ = Observable.combineLatest(
      this.mockRecipeList$,
      this.userService.uid$,
      (recipeList, uid) => {
        return recipeList.map(recipe => {
          return {
            ...recipe,
            ofCurrentUser: recipe.uid === uid
          };
        });
      });
  }

  getRecipe(id) {
    // from mock
    return Observable.of(mockRecipeList.find((recipe) => recipe.id === id))
      .switchMap(recipe => {
        return Observable.combineLatest(
          this.userService.getUser(recipe && recipe.uid),
          this.userService.uid$,
          (owner, uid) => {
            return recipe && {
              ...recipe,
              owner,
              writeProtected: recipe.uid !== uid
            };
          });
      });
  }

  saveRecipe(recipe) {
    if (recipe.id) {
      const currentRecipe = mockRecipeList.find((recipeInList) => recipe.id === recipeInList.id);
      Object.assign(currentRecipe, recipe);
    } else {
      recipe.id = Math.floor(Math.random() * 1000) + '';
      recipe.uid = this.userService.user.uid;

      mockRecipeList.push(recipe);
    }

    this.mockRecipeList$.next(mockRecipeList);

    return new Promise<{ key }>((resolve) => {
      resolve({ key: recipe.id });
    });
  }
}
