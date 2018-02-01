import { Component, OnInit, group } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeekRecipeService } from '../../services/week-recipe.service';
import { Week, FoodGroup, Utils, WeekRecipe } from '../../models/interfaces';
import * as _ from 'lodash';
import { RecipeService, Recipe, IngredientGroup, Ingredient, GroceryIngredient, GroceryGroup } from '../../services/recipe.service';
import { GroceryService } from '../../services/grocery.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit {
  foodGroup: FoodGroup;
  groupTitle: string;
  ingredients: GroceryIngredient[];
  groceryGroup: GroceryGroup;
  group: IngredientGroup;

  constructor(private route: ActivatedRoute, private groceryService: GroceryService) { }

  ngOnInit() {
    this.groceryService.getAllGroceryLists().subscribe((groceryGroups: GroceryGroup[]) => {
      this.route.params.subscribe(params => {
        this.foodGroup = +params['foodGroupId'];

        this.groceryGroup = _.first(_.filter(groceryGroups, (g: GroceryGroup) => g.weekId == params['weekId']));
        this.group = _.first(_.filter(this.groceryGroup.groups, (g: IngredientGroup) => g.foodGroup == this.foodGroup));
        
        this.groupTitle = Utils.getFoodGroupName(this.foodGroup);
        this.ingredients = this.group.ingredients;
      });
    });
  }

  getUnitName(unitId: number) {
    return Utils.getUnitName(unitId);
  }

  save(ingredient: GroceryIngredient){
    ingredient.isFinished = !ingredient.isFinished;

    this.groceryService.update(this.groceryGroup);
  }
}
