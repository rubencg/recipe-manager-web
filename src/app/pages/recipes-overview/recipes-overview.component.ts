import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { FoodTime } from '../../models/interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-recipes-overview',
  templateUrl: './recipes-overview.component.html',
  styleUrls: ['./recipes-overview.component.scss']
})
export class RecipesOverviewComponent implements OnInit {

  recipes: Recipe[]= [];
  filteredRecipes: Recipe[]= [];
  timeTitle = "Hora del Dia";

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    })
  }

  selectTime(foodTime: FoodTime){
    switch (foodTime) {
      case FoodTime.Breakfast:
        this.timeTitle = "Desayuno";
        break;
      case FoodTime.AMSnack:
        this.timeTitle = "A.M. Snack";
        break;
      case FoodTime.Lunch:
        this.timeTitle = "Comida";
        break;
      case FoodTime.PMSnack:
        this.timeTitle = "P.M. Snack";
        break;
      case FoodTime.Dinner:
        this.timeTitle = "Cena";
        break;
      default:
        this.timeTitle = "Hora del Dia";
        break;
    }

    if(foodTime != -1){
      this.filteredRecipes = _.filter(this.recipes, (r: Recipe) => r.foodTime == foodTime);
    }else{
      this.filteredRecipes = this.recipes;
    }
    
  }
}
