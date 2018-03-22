import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../services/recipe.service';
import { Utils } from '../../models/interfaces';

@Component({
  selector: 'recipe-thumbnail',
  templateUrl: './recipe-thumbnail.component.html',
  styleUrls: ['./recipe-thumbnail.component.scss']
})
export class RecipeThumbnailComponent implements OnInit {
  @Input()
  recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

  getGroupName(group) {
    return Utils.getGroupName(+group);
  }

}
