import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes-overview',
  templateUrl: './recipes-overview.component.html',
  styleUrls: ['./recipes-overview.component.scss']
})
export class RecipesOverviewComponent implements OnInit {

  recipes: Recipe[]= [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
    })
  }
}
