import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { LoginComponent } from './login/login.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [RecipeListComponent, LoginComponent, GroceryListComponent, RecipeComponent]
})
export class PagesModule { }
