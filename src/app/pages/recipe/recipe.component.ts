import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';
import * as _ from 'lodash';
import { Unit, Utils } from '../../models/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  id: string;
  recipe: Recipe;
  group: string;
  time: string;
  similarRecipes: Recipe[];
  favoriteRecipes: Recipe[];
  canSetFavorites: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
    private userService: UserService) { }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      this.recipeService.getAllRecipes().subscribe(recipes => {
        this.recipe = _.first(_.filter(recipes, r => r.key == this.id));
        this.group = Utils.getGroupName(+this.recipe.group);
        this.time = Utils.getFoodTimeName(+this.recipe.foodTime);
        this.favoriteRecipes = _.filter(recipes, r => r.isFavorite && r.group == this.recipe.group && r.key != this.recipe.key);
        this.similarRecipes = _.filter(recipes, r => r.group == this.recipe.group && r.foodTime == this.recipe.foodTime && r.key != this.recipe.key);
        this.userService.canSetFavorites().subscribe(config => {
          this.canSetFavorites = config[0].canSetFavorites;
        });
      });

   });
  }

  getUnitName(unitId: number){
    return Utils.getUnitName(unitId);
  }

  getGroupName(group){
    return Utils.getGroupName(+group);
  }

  toggleFavorite(){
    this.recipe.isFavorite = this.recipe.isFavorite ? false : true;
    this.recipeService.update(this.recipe);
  }
}
