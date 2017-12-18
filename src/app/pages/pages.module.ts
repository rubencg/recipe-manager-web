import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { LoginComponent } from './login/login.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RecipeListComponent, LoginComponent, GroceryListComponent]
})
export class PagesModule { }
