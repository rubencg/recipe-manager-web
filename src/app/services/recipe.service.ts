import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FoodTime, Group, Unit, FoodGroup, Difficulty } from '../models/interfaces';


@Injectable()
export class RecipeService {
  recipeRef: Observable<any[]>;
  recipes: Recipe[];

  constructor(private db: AngularFireDatabase) {
    this.recipeRef = db.list('recipes').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getAllRecipes() : Observable<Recipe[]>{
    this.recipeRef.subscribe(recipes => this.recipes = recipes);
    return this.recipeRef;
  }

  save(recipe: Recipe) : any {
    return this.db.list('recipes').push(recipe);
  }

  update(recipe: Recipe){
    this.db.list('recipes').update(recipe.key, recipe);
  }

}

export interface Recipe {
  key?: string;
  name: string;
  serves?: number;
  prepTime?: number;
  cookTime?: number;
  difficulty?: Difficulty;
  ingredients?: Ingredient[];
  imageUrl?: string;
  imageName?: string;
  instructions?: string;
  foodTime?: FoodTime;
  group?: Group;
  isFavorite?: boolean;
}

export interface Ingredient{
  name: string;
  quantity: number;
  unit: Unit;
  foodGroup: FoodGroup;
}

export interface GroceryList{
  key?: string;
  weekId: string;
  groups: IngredientGroup[];
}

export interface IngredientGroup{
  name: string;
  foodGroup: FoodGroup;
  ingredients?: GroceryIngredient[];
  groupImage?: string;
  total: number;
}

export interface GroceryIngredient{
  name: string;
  quantity: number;
  unit: Unit;
  unitName: string;
  isFinished: boolean;
  foodGroup: FoodGroup;
}
