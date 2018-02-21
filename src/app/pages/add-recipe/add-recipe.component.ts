import { Component, OnInit } from '@angular/core';
import { Recipe, Ingredient, RecipeService } from '../../services/recipe.service';
import { Group, Difficulty, FoodGroup, Unit, Week } from '../../models/interfaces';
import { element } from 'protractor';
import { WeekRecipeService } from '../../services/week-recipe.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  private weekName: string;
  private isNewWeek: boolean = false;
  private name: string;
  private instructions: string;
  private group: number = 1;
  private foodTime: number = 1;
  private ingredients: string;
  private difficulty: Difficulty = 1;
  private serves: number = 1;
  private cookTime: number = null;
  private prepTime: number = null;
  private day: number = 1;

  constructor(private recipeService : RecipeService, private weekService: WeekRecipeService) {
    this.recipeService.getAllRecipes();
    this.weekService.getAllWeeks();

   }

  ngOnInit() {
  }

  save(){
    try{
      let recipe: Recipe = {
        name: this.name,
        instructions: this.instructions,
        group: this.group,
        foodTime: this.foodTime,
        cookTime: this.cookTime,
        difficulty: this.difficulty,
        prepTime: this.prepTime,
        serves: this.serves,
        ingredients: []
      }
      let ingredients: string[] = this.ingredients.split(/\r?\n/);
      ingredients.forEach(ingredient => {
        let elements: string[] = ingredient.split(',');

        let i: Ingredient = {
          name: elements[0],
          quantity: +elements[1],
          unit: this.getUnit(elements[2]),
          foodGroup: this.getFoodGroup(elements[3]),
        };
        recipe.ingredients.push(i);
      });

      this.recipeService.save(recipe).then( (r: Recipe) => {
        let week: Week;
        let update: boolean = true;
        if(this.isNewWeek){
          week = _.first(_.filter(this.weekService.weeks, (w: Week) => w.name == this.weekName));
          if(!week){
            update = false;
            week = {
              name: this.weekName,
              recipes: []
            };
          }
          week.recipes.push({
            DayOrderId: this.day,
            FoodTime: recipe.foodTime,
            RecipeId: r.key,
            RecipeName: recipe.name
          })
        }
        if(update){
          this.weekService.update(week);
        }else{
          this.weekService.save(week);
        }

        this.clear();
      });
    }catch(err){
      alert(err);
    }
  }

  clear(){
    this.name = "";
    this.instructions = "";
    this.ingredients = "";
    this.serves = 1;
    this.cookTime = null;
    this.prepTime = null;

  }

  getUnit(s: string): Unit{
    switch (s) {
    case "cup":
      return Unit.cup;
    case "hf":
      return Unit.hf;
    case "lb":
      return Unit.lb;
    case "oz":
      return Unit.oz;
    case "pz":
      return Unit.pz;
    case "shf":
      return Unit.shf;
    case "tbsp":
      return Unit.tbsp;
    case "tsp":
      return Unit.tsp;
    }
  }

  getFoodGroup(s: string): FoodGroup{
    s = s.toLowerCase();
    switch (s) {
      case "f":
        return FoodGroup.Fruit
      case "v":
        return FoodGroup.Vegetable
      case "g":
        return FoodGroup.Grains
      case "l":
        return FoodGroup.Dairy
      case "p":
        return FoodGroup.Proteins
      case "o":
        return FoodGroup.Others
    }
  }

}
