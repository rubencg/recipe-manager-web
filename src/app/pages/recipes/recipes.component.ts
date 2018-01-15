import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[]= [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
    })
  }

}
