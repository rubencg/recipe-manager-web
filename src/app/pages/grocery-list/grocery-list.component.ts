import { Component, OnInit } from '@angular/core';
import { WeekRecipeService } from '../../services/week-recipe.service';
import { RecipeService, Recipe, Ingredient, IngredientGroup, GroceryList, GroceryIngredient } from '../../services/recipe.service';
import { Week, Utils, FoodGroup } from '../../models/interfaces';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { GroceryService } from '../../services/grocery.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
  weeks: Week[];
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  weekTitle = "Semana";
  groups: IngredientGroup[];
  groceryList: GroceryList;
  week: Week;

  constructor(private recipeService: RecipeService, private weekService: WeekRecipeService,
    private route: ActivatedRoute, private groceryService: GroceryService) { }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });

    this.weekService.getAllWeeks().subscribe((weeks: Week[]) => {
      this.route.params.subscribe(params => {
        this.groceryService.getAllGroceryLists().subscribe((groceryLists: GroceryList[]) => {
          this.weeks = weeks;
          this.groceryList = _.first(_.filter(groceryLists, (gs: GroceryList) => gs.weekId == params['weekId']));
          this.selectWeek(params['weekId']);
        });
      });
    });


  }

  selectWeek(key: string) {
    if (key) {
      this.week = _.first(_.filter(this.weeks, (w: Week) => w.key == key));
      this.weekTitle = "Semana " + this.week.name;
      this.filter();
    } else {
      this.weekTitle = "Semana";
      this.filteredRecipes = null;
      this.groups = null;
    }
  }

  getCurrentlyFinished(g: IngredientGroup) {
    return _.filter(g.ingredients, (gI: GroceryIngredient) => gI.isFinished).length;
  }

  filter() {
    if (this.groceryList) {
      this.groups = this.groceryList.groups;
    } else {
      this.newGroup();
    }
  }

  newGroup() {
    this.filteredRecipes = _.filter(this.recipes, (r: Recipe) => _.includes(_.map(this.week.recipes, 'RecipeId'), r.key));

    let ingredientsArray = _.map(this.filteredRecipes, 'ingredients');
    let ingredients: Ingredient[] = [];
    ingredientsArray.forEach(ings => {
      ings.forEach((ing: Ingredient) => {
        ingredients.push(ing);
      });
    });

    this.groups = _.chain(ingredients)
      .groupBy((i: Ingredient) => i.foodGroup)
      .map((i: Ingredient[], key: FoodGroup) => {
        let g: IngredientGroup = {
          name: Utils.getFoodGroupName(+key),
          foodGroup: +key,
          groupImage: "",
          total: i.length,
          ingredients: []
        };

        i.forEach(ing => {
          g.ingredients.push({
            isFinished: false,
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
            unitName: Utils.getUnitName(ing.unit),
            foodGroup: key
          });
        });

        return g;
      })
      .value();
  }

  deleteGroceryList() {
    if (this.groceryList) {
      console.log(this.groceryList);
      
      this.groceryService.delete(this.groceryList);
      this.groceryList = null;
      this.groups = null;
      this.newGroup();
    }
  }

  createGroceryList() {
    let g: GroceryList = {
      weekId: this.week.key,
      groups: this.groups
    };

    this.groceryList = g;
    this.groceryService.save(g);
  }

}
