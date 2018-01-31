import { Component, OnInit } from '@angular/core';
import { WeekRecipeService } from '../../services/week-recipe.service';
import { Week, FoodTime, Utils, WeekRecipe } from '../../models/interfaces';
import * as _ from 'lodash';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { WeekDay } from '@angular/common/src/i18n/locale_data_api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  weekName: string;
  weeks: Week[];
  filteredRecipes: Recipe[] = [];
  weekTitle = "Semana";
  recipes: Recipe[]= [];
  days = [
    {name: "Lunes", dayId: 1},
    {name: "Martes", dayId: 2},
    {name: "Miercoles", dayId: 3},
    {name: "Jueves", dayId: 4},
    {name: "Viernes", dayId: 5},
    {name: "Sabado", dayId: 6},
    {name: "Domingo", dayId: 7}
  ];
  activeDay: number = -1;
  weekId: string;
  
  constructor(private recipeService: RecipeService, private weekService: WeekRecipeService,
    private route: ActivatedRoute, private router: Router ) { 
  }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((recipes: any[]) => {
      this.recipes = recipes;
    });
    this.weekService.getAllWeeks().subscribe((weeks: Week[]) => {
      this.weeks = weeks;
      this.route.params.subscribe(params => {
        this.weekId = params['weekId'];      
        if(+params['dayId']){
          this.activeDay = +params['dayId'];
        }
        this.filter();
     });
    });
  }

  next(){
    let url: string = 'recipe-list/'+ this.weekId + '/';
    if(this.activeDay + 1 > 7){
      url += 1;
    }else{
      url += (this.activeDay + 1);
    }
    this.router.navigateByUrl(url);
  }

  previous(){
    let url: string = 'recipe-list/'+ this.weekId + '/';
    if(this.activeDay - 1 < 1){
      url += 7;
    }else{
      url += (this.activeDay - 1);
    }
    this.router.navigateByUrl(url);
  }

  filter(){
    if(this.weekId){
      let week: Week = _.first(_.filter(this.weeks, (w: Week) => w.key == this.weekId));
      if(week){
        let weekRecipes = _.filter(week.recipes, (r: WeekRecipe) => r.DayOrderId == this.activeDay);
        this.filteredRecipes = _.filter(this.recipes, (r: Recipe) => _.includes(_.map(weekRecipes, 'RecipeId'), r.key) );
      }
    }else{
      this.filteredRecipes = [];
    }
  }

  getFoodTimeName(id: FoodTime){
    return Utils.getFoodTimeName(+id);
  }

}
