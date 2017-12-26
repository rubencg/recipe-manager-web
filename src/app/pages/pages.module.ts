import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { LoginComponent } from './login/login.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RouterModule } from '@angular/router';
import { GroceryComponent } from './grocery/grocery.component';
import { RecipesComponent } from './recipes/recipes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [RecipeListComponent, LoginComponent, GroceryListComponent, RecipeComponent, GroceryComponent, RecipesComponent]
})
export class PagesModule { }
