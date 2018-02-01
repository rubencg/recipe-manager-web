import { Component, OnInit } from '@angular/core';
import { WeekRecipeService } from '../../services/week-recipe.service';
import { RecipeService, Recipe, Ingredient, IngredientGroup } from '../../services/recipe.service';
import { Week, Utils, FoodGroup } from '../../models/interfaces';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private recipeService: RecipeService, private weekService: WeekRecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });

    this.weekService.getAllWeeks().subscribe((weeks: Week[]) => {
      this.weeks = weeks;
      this.route.params.subscribe(params => {      
        this.selectWeek(params['weekId']);
     });
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
