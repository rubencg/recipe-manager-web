import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeekRecipeService } from '../../services/week-recipe.service';
import { Week, FoodGroup, Utils, WeekRecipe } from '../../models/interfaces';
import * as _ from 'lodash';
import { RecipeService, Recipe, IngredientGroup, Ingredient, GroceryIngredient } from '../../services/recipe.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit {
  week: Week;
  recipes: Recipe[]= [];
  filteredRecipes: Recipe[]= [];
  foodGroup: FoodGroup;
  ingredients: GroceryIngredient[] = [];
  groupTitle: string;

  constructor(private route: ActivatedRoute, private weekService: WeekRecipeService,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });

    this.weekService.getAllWeeks().subscribe((weeks: Week[]) => {
      this.route.params.subscribe(params => {
        let week = _.first(_.filter(weeks, (w: Week) => w.key == params['weekId']));
        this.foodGroup = +params['foodGroupId'];
        this.groupTitle = Utils.getFoodGroupName(this.foodGroup);

        this.filteredRecipes = _.filter(this.recipes, (r: Recipe) => _.includes(_.map(week.recipes, 'RecipeId'), r.key) );

        let ingredientsArray = _.map(this.recipes, 'ingredients');
        
        ingredientsArray.forEach(ings => {
          ings.forEach((ing: GroceryIngredient) => {
            if(ing.foodGroup == this.foodGroup){
              this.ingredients.push(ing);
            }
          });
        });

      });
    });
  }

  getUnitName(unitId: number){
    return Utils.getUnitName(unitId);
  }


}
