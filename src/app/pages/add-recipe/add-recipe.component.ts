import { Component, OnInit } from '@angular/core';
import { Recipe, Ingredient, RecipeService } from '../../services/recipe.service';
import { Group, Difficulty, FoodGroup, Unit } from '../../models/interfaces';
import { element } from 'protractor';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  private name: string;
  private instructions: string;
  private group: number = 1;
  private foodTime: number = 1;
  private ingredients: string;
  private difficulty: Difficulty = 1;
  private serves: number = 1;
  private cookTime: number = null;
  private prepTime: number = null;

  constructor(private recipeService : RecipeService) { }

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
      
      this.recipeService.save(recipe); 

      this.clear();
    }catch(err){
      alert(err);
    }
    
  }

  clear(){
    this.name = "";
    this.instructions = "";
    this.group = 1;
    this.foodTime = 1;
    this.ingredients = "";
    this.difficulty = 1;
    this.serves = 1;
    this.cookTime = null;
    this.prepTime = null;
  
  }

  getUnit(s: string): Unit{
    switch (s) {
    case "cup":
      return Unit.cup;
      break;
    case "hf":
      return Unit.hf;
      break;
    case "lb":
      return Unit.lb;
      break;
    case "oz":
      return Unit.oz;
      break;
    case "pz":
      return Unit.pz;
      break;
    case "shf":
      return Unit.shf;
      break;
    case "tbsp":
      return Unit.tbsp;
      break;
    case "tsp":
      return Unit.tsp;
      break;
    }
  }

  getFoodGroup(s: string): FoodGroup{
    s = s.toLowerCase();
    switch (s) {
      case "f":
        return FoodGroup.Fruit
        break;
      case "v":
        return FoodGroup.Vegetable
        break;
      case "g":
        return FoodGroup.Grains
        break;
      case "l":
        return FoodGroup.Dairy
        break;
      case "p":
        return FoodGroup.Proteins
        break;
      case "o":
        return FoodGroup.Others
        break;
    }
  }

}
