import { Component, OnInit } from '@angular/core';
import { Recipe, Ingredient, RecipeService } from '../../services/recipe.service';
import { Group, Difficulty } from '../../models/interfaces';
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
  private cookTime: number;
  private prepTime: number;

  constructor(private recipeService : RecipeService) { }

  ngOnInit() {
  }

  save(){
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
        foodGroup: +elements[2],
        unit: +elements[3]
      };
      recipe.ingredients.push(i);
    });
    
    this.recipeService.save(recipe);
    
  }

}
