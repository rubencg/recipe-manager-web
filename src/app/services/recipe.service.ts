import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


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

}

export interface Recipe {
  key?: string;
  name: string;
  ingredients?: string[];
  image?: string;
  instructions?: string[];
}

export interface Ingredient{
  name: string;
  quantity: number;
  unitId: number;
}