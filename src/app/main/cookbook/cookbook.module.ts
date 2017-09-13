import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookbookComponent } from './cookbook.component';
import { RecipeCardComponent } from './recipe-display/recipe-card/recipe-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookbookService } from './cookbook.service';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    CookbookComponent,
    RecipeCardComponent,
    RecipeListComponent,
    RecipeDisplayComponent
  ],
  exports: [
    CookbookComponent
  ],
  providers: [
    CookbookService
  ]
})
export class CookbookModule { }
