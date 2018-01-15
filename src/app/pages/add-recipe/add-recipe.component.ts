import { Component, OnInit } from '@angular/core';
import { Recipe, Ingredient, RecipeService } from '../../services/recipe.service';
import { Group } from '../../models/interfaces';
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

  constructor(private recipeService : RecipeService) { }

  ngOnInit() {
  }

  save(){
    let recipe: Recipe = {
      name: this.name,
      instructions: this.instructions,
      group: this.group,
      foodTime: this.foodTime,
      ingredients: []
    }
    let ingredients: string[] = this.ingredients.split(/\r?\n/);
    ingredients.forEach(ingredient => {
      let elements: string[] = ingredient.split(',');
      
      let i: Ingredient = {
        name: elements[0],
        quantity: +elements[1],
        unit: +elements[2]
      };
      recipe.ingredients.push(i);
    });
    
    this.recipeService.save(recipe);
    
  }

}
