import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';
import * as _ from 'lodash';
import { Unit, Utils } from '../../models/interfaces';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  id: string;
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      this.recipeService.getAllRecipes().subscribe(recipes => {
        this.recipe = _.first(_.filter(recipes, r => r.key == this.id));
      });

   });
  }

  getUnitName(unitId: number){
    return Utils.getUnitName(unitId);
  }

}
