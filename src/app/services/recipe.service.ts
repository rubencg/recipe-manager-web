import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FoodTime, Group, Unit } from '../models/interfaces';


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

  save(recipe: Recipe){
    this.db.list('recipes').push(recipe);
  }

}

export interface Recipe {
  key?: string;
  name: string;
  ingredients?: Ingredient[];
  image?: string;
  instructions?: string;
  foodTime?: FoodTime;
  group?: Group;
}

export interface Ingredient{
  name: string;
  quantity: number;
  unit: Unit;
}