import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { FoodTime, Week } from '../../models/interfaces';
import * as _ from 'lodash';
import { WeekRecipeService } from '../../services/week-recipe.service';

@Component({
  selector: 'app-recipes-overview',
  templateUrl: './recipes-overview.component.html',
  styleUrls: ['./recipes-overview.component.scss']
})
export class RecipesOverviewComponent implements OnInit {
  weeks: Week[]= [];
  recipes: Recipe[]= [];
  filteredRecipes: Recipe[]= [];
  timeTitle = "Hora del Dia";
  weekTitle = "Semana";
  filterText = "";

  //Filters
  foodTime: FoodTime = -1;
  weekName: string = "";

  constructor(private recipeService: RecipeService, private weekService: WeekRecipeService) { }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });
    this.weekService.getAllWeeks().subscribe((weeks: Week[]) => {
      this.weeks = weeks;
    })

  }

  search(){
    this.filter();
  }

  selectWeek(name: string){
    if(name){
      this.weekTitle = "Semana " + name;
    }else{
      this.weekTitle = "Semana";
    }

    this.weekName = name;

    this.filter();
  }

  filter(){
    switch (this.foodTime) {
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

    this.filteredRecipes = this.recipes;

    if(this.foodTime != -1){
      this.filteredRecipes = _.filter(this.recipes, (r: Recipe) => r.foodTime == this.foodTime);
    }

    if(this.weekName){
      let week: Week = _.first(_.filter(this.weeks, (w: Week) => w.name == this.weekName));
      this.filteredRecipes = _.filter(this.filteredRecipes, (r: Recipe) => _.includes(_.map(week.recipes, 'RecipeId'), r.key) );
    }

    if(this.filterText){
      this.filteredRecipes = _.filter(this.filteredRecipes, (r: Recipe) => r.name.toLowerCase().includes(this.filterText.toLowerCase()));
    }
  }

  selectTime(foodTime: FoodTime){
    this.foodTime = foodTime;

    this.filter();
    this.filterText = "";
  }
}
