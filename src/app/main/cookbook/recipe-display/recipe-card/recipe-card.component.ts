import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import 'rxjs/add/operator/do';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit, OnChanges {
  @Input() recipe;
  @Input() recipeOwner;
  @Input() writeProtected = false;
  @Output() save: EventEmitter<any> = new EventEmitter();
  recipeForm;
  edit;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.recipe ? this.recipeForm.reset(this.recipe) : this.createForm();
    if (this.recipe) {
      const ingredientFGs = this.recipe.ingredients.map(
        ingredient => this.createIngredient(ingredient));
      this.recipeForm.controls.ingredients =
        this.formBuilder.array(ingredientFGs);
    }
    this.edit = !this.recipe;
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  };

  createForm() {
    this.recipeForm = this.formBuilder.group({
      title: '',
      type: '',
      ingredients: this.formBuilder.array([this.createIngredient()]),
      instructions: '',
      id: ''
    });
  }

  createIngredient(ingredient = { name: '', quantity: '' }) {
    return this.formBuilder.group(ingredient);
  }

  addIngredient(event) {
    event.preventDefault();
    (this.recipeForm.get('ingredients') as FormArray).push(this.createIngredient());
  }

  handleEdit() {
    if (!this.writeProtected) {
      this.edit = true;
    }
  }

  handleSave() {
    this.save.emit(this._getDataFromForm());
  }

  _getDataFromForm() {
    const formModel = this.recipeForm.value;

    const ingredientsDeepCopy = this.ingredients.map(
      (ingredient) => Object.assign({}, ingredient.value)
    );

    const recipe = formModel;
    recipe.ingredients = ingredientsDeepCopy;
    return recipe;
  }

  getPlaceholder(placeholder) {
    if (this.edit) {
      return placeholder;
    }
  }

}