import { Component, OnInit, group } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeekRecipeService } from '../../services/week-recipe.service';
import { Week, FoodGroup, Utils, WeekRecipe, Unit } from '../../models/interfaces';
import * as _ from 'lodash';
import { RecipeService, Recipe, IngredientGroup, Ingredient, GroceryIngredient, GroceryList } from '../../services/recipe.service';
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
  finishedIngredients: GroceryIngredient[] = [];
  groceryList: GroceryList;
  group: IngredientGroup;

  constructor(private route: ActivatedRoute, private groceryService: GroceryService) { }

  ngOnInit() {
    this.groceryService.getAllGroceryLists().subscribe((groceryLists: GroceryList[]) => {
      this.route.params.subscribe(params => {
        this.foodGroup = +params['foodGroupId'];

        this.groceryList = _.first(_.filter(groceryLists, (g: GroceryList) => g.weekId == params['weekId']));
        if(this.groceryList){
          this.group = _.first(_.filter(this.groceryList.groups, (g: IngredientGroup) => g.foodGroup == this.foodGroup));
        }


        this.groupTitle = Utils.getFoodGroupName(this.foodGroup);
        this.ingredients = _.filter(this.group.ingredients, (i: GroceryIngredient) => !i.isFinished);
        this.finishedIngredients = _.filter(this.group.ingredients, (i: GroceryIngredient) => i.isFinished);
      });
    });
  }

  getUnitName(unitId: number) {
    return Utils.getUnitName(unitId);
  }

  save(ingredient: GroceryIngredient){
    ingredient.isFinished = !ingredient.isFinished;
    if(ingredient.isFinished){
      this.finishedIngredients.push(ingredient);
      _.remove(this.ingredients, (i: GroceryIngredient) => i.name == ingredient.name);
    }else{
      this.ingredients.push(ingredient);
      _.remove(this.finishedIngredients, (i: GroceryIngredient) => i.name == ingredient.name);
    }

    this.groceryService.update(this.groceryList);
  }

  convertIngToOz(ingredient: GroceryIngredient){
    if(ingredient.unit == Unit.gr){
      ingredient.unit = Unit.oz;
      ingredient.unitName = Utils.getUnitName(Unit.oz);
      ingredient.quantity = ingredient.quantity * 0.035274;
    }
  }

  convertIngToGr(ingredient: GroceryIngredient){
    if(ingredient.unit == Unit.oz){
      ingredient.unit = Unit.gr;
      ingredient.unitName = Utils.getUnitName(Unit.gr);
      ingredient.quantity = ingredient.quantity / 0.035274;
    }
  }

  convertToOz(){
    this.finishedIngredients.forEach((ingredient: GroceryIngredient) => {
      this.convertIngToOz(ingredient);
    });
    this.ingredients.forEach((ingredient: GroceryIngredient) => {
      this.convertIngToOz(ingredient);
    });
  }

  convertToGr(){
    this.ingredients.forEach((ingredient: GroceryIngredient) => {
      this.convertIngToGr(ingredient);
    });
    this.finishedIngredients.forEach((ingredient: GroceryIngredient) => {
      this.convertIngToGr(ingredient);
    });
  }
}
