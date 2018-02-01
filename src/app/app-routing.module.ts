import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { LoginComponent } from './pages/login/login.component';
import { GroceryListComponent } from './pages/grocery-list/grocery-list.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { GroceryComponent } from './pages/grocery/grocery.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipesOverviewComponent } from './pages/recipes-overview/recipes-overview.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';

const routes: Routes = [
  { path: 'recipe-list/:weekId/:dayId', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'recipe-list/:weekId', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'recipe-list', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: RecipesOverviewComponent },
      { path: 'add', component: AddRecipeComponent }
    ] 
  },
  { path: 'recipe/:id', component: RecipeComponent, canActivate: [AuthGuard] },
  { path: 'grocery-list', component: GroceryListComponent, canActivate: [AuthGuard] },
  { path: 'grocery-list/:weekId', component: GroceryListComponent, canActivate: [AuthGuard] },
  { path: 'grocery-list/:weekId/:foodGroupId', component: GroceryComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to recipe-list
  { path: '**', redirectTo: 'recipe-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
