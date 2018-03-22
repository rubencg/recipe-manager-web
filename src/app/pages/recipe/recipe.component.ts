import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';
import * as _ from 'lodash';
import { Unit, Utils, FileUpload } from '../../models/interfaces';
import { UserService } from '../../services/user.service';
import { UploadFileService } from '../../services/upload-file.service';

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

  // Upload
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  uploads: FileUpload[];


  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
    private userService: UserService, private uploadService: UploadFileService) { }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      this.recipeService.getAllRecipes().subscribe(recipes => {
        this.recipe = _.first(_.filter(recipes, r => r.key == this.id));
        this.group = Utils.getGroupName(+this.recipe.group);
        this.time = Utils.getFoodTimeName(+this.recipe.foodTime);
        this.favoriteRecipes = _.filter(recipes, r => r.isFavorite && r.foodTime == this.recipe.foodTime && r.group == this.recipe.group && r.key != this.recipe.key);
        this.similarRecipes = _.filter(recipes, r => r.group == this.recipe.group && r.foodTime == this.recipe.foodTime && r.key != this.recipe.key);
        this.userService.canSetFavorites().subscribe(config => {
          this.canSetFavorites = config[0].canSetFavorites;
        });

        this.uploadService.getFileUploads().subscribe(uploads => this.uploads = uploads);
      });

    });
  }

  getUnitName(unitId: number) {
    return Utils.getUnitName(unitId);
  }

  getGroupName(group) {
    return Utils.getGroupName(+group);
  }

  toggleFavorite() {
    this.recipe.isFavorite = this.recipe.isFavorite ? false : true;
    this.recipeService.update(this.recipe);
  }

  // Upload
  selectFile(event) {
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    const file = this.selectedFiles.item(0)
    this.selectedFiles = undefined

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.recipe, this.progress);
  }

  remove(){
    let file = _.chain(this.uploads)
      .filter((u: FileUpload) => u.name == this.recipe.imageName)
      .first()
      .value();

    this.uploadService.deleteFileUpload(file, this.recipe);
  }
}
