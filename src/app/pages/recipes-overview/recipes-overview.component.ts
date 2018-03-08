import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { FoodTime, Week, Utils, Group } from '../../models/interfaces';
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
  groupTitle = "Grupo";
  // filterText = "";

  //Filters
  foodTime: FoodTime = -1;
  weekName: string = "";
  groupId: Group = -1;
  onlyFavorites: boolean = false;

  constructor(private recipeService: RecipeService, private weekService: WeekRecipeService) { }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });
    this.weekService.getAllWeeks().subscribe((weeks: Week[]) => {
      this.weeks = weeks;
    });

  }

  // search(){
  //   if(this.filterText.length > 3){
  //     this.filter();
  //   }
  // }

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
    this.timeTitle = Utils.getFoodTimeName(this.foodTime);
    this.groupTitle = Utils.getGroupName(this.groupId);

    this.filteredRecipes = this.recipes;

    if(this.foodTime != -1){
      this.filteredRecipes = _.filter(this.filteredRecipes, (r: Recipe) => r.foodTime == this.foodTime);
    }

    if(this.weekName){
      let week: Week = _.first(_.filter(this.weeks, (w: Week) => w.name == this.weekName));
      this.filteredRecipes = _.filter(this.filteredRecipes, (r: Recipe) => _.includes(_.map(week.recipes, 'RecipeId'), r.key) );
    }

    if(this.groupId != -1){
      this.filteredRecipes = _.filter(this.filteredRecipes, (r: Recipe) => r.group == this.groupId);
    }

    if(this.onlyFavorites){
      this.filteredRecipes = _.filter(this.filteredRecipes, (r: Recipe) => r.isFavorite);
    }

    // if(this.filterText.length > 3){
    //   this.filteredRecipes = _.filter(this.filteredRecipes, (r: Recipe) => r.name.toLowerCase().includes(this.filterText.toLowerCase()));
    // }
  }

  getGroupName(group){
    return Utils.getGroupName(+group);
  }

  selectTime(foodTime: FoodTime){
    this.foodTime = foodTime;

    this.filter();
    // this.filterText = "";
  }

  selectGroup(groupId: Group){
    this.groupId = groupId;

    this.filter();
    // this.filterText = "";
  }
}
