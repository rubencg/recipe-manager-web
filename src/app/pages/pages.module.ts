import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { LoginComponent } from './login/login.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RouterModule } from '@angular/router';
import { GroceryComponent } from './grocery/grocery.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipesOverviewComponent } from './recipes-overview/recipes-overview.component';
import { FormsModule } from '@angular/forms';
import { UserOptionsComponent } from './user-options/user-options.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [RecipeListComponent, LoginComponent, GroceryListComponent, RecipeComponent, GroceryComponent, RecipesComponent, AddRecipeComponent, RecipesOverviewComponent, UserOptionsComponent]
})
export class PagesModule { }
