import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  id: number;
  recipe: Recipe;
  
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      let recipes : Recipe[] = this.recipeService.getAllRecipes();
      this.recipe = _.first(_.filter(recipes, r => r.id == this.id));
      
   });
  }

}
