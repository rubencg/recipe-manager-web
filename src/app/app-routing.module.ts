import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { LoginComponent } from './pages/login/login.component';
import { GroceryListComponent } from './pages/grocery-list/grocery-list.component';
import { RecipeComponent } from './pages/recipe/recipe.component';

const routes: Routes = [
  { path: 'recipe-list', component: RecipeListComponent, canActivate: [AuthGuard] },
  { path: 'recipe', component: RecipeComponent, canActivate: [AuthGuard] },
  { path: 'grocery-list', component: GroceryListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to recipe-list
  { path: '**', redirectTo: 'recipe-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
