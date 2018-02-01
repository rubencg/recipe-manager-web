import { Component, OnInit } from '@angular/core';
import { WeekRecipeService } from '../../services/week-recipe.service';
import { RecipeService, Recipe, Ingredient, IngredientGroup } from '../../services/recipe.service';
import { Week, Utils, FoodGroup } from '../../models/interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
  weeks: Week[]= [];
  recipes: Recipe[]= [];
  filteredRecipes: Recipe[]= [];
  weekTitle = "Semana";
  groups: IngredientGroup[];

  groceryGroup: any[] = [
    { id: 1, name: "Frutas", quantityNeeded: 4, quantityBought: 2 },
    { id: 2, name: "Verduras", quantityNeeded: 8, quantityBought: 5 },
    { id: 3, name: "Lacteos", quantityNeeded: 6, quantityBought: 8 },
    { id: 4, name: "Carnes", quantityNeeded: 43, quantityBought: 43 },
    { id: 5, name: "Especias", quantityNeeded: 5, quantityBought: 3 },
    { id: 6, name: "Otros", quantityNeeded: 14, quantityBought: 13 },
  ];

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

  selectWeek(key: string){
    let week: Week;
    if(key){
      week = _.first(_.filter(this.weeks, (w: Week) => w.key == key));
      this.weekTitle = "Semana " + week.name;
      this.filter(week);
    }else{
      this.weekTitle = "Semana";
      this.filteredRecipes = null;
      this.groups = null;
    }
    
    
  }

  filter(week: Week){    
    this.filteredRecipes = _.filter(this.recipes, (r: Recipe) => _.includes(_.map(week.recipes, 'RecipeId'), r.key) );

    let ingredientsArray = _.map(this.filteredRecipes, 'ingredients');
    let ingredients: Ingredient[] = [];
    ingredientsArray.forEach(ings => {
      ings.forEach((ing: Ingredient) => {
        ingredients.push(ing);
      });
    });
    
    this.groups = _.chain(ingredients)
    .groupBy((i: Ingredient) => i.foodGroup)
    .map((i: Ingredient[], key: FoodGroup) => {
      let g: IngredientGroup = {
        name: Utils.getFoodGroupName(+key),
        foodGroup: +key,
        groupImage: "",
        ingredients: i,
        total: i.length,
        totalLeft: i.length,
        weekId: week.key
      };
      
      return g;
    })
    .value();
    
  }

}
