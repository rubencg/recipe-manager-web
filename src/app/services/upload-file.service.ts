import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FileUpload } from '../models/interfaces';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Recipe, RecipeService } from './recipe.service';

@Injectable()
export class UploadFileService {

  private basePath = '/uploads';
  fileUploads: FileUpload[];
  uploadsRef: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private recipeService: RecipeService) {
    this.uploadsRef = db.list(this.basePath).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getFileUploads() {
    this.uploadsRef.subscribe(uploads => this.fileUploads = uploads);
    return this.uploadsRef;
  }

  pushFileToStorage(fileUpload: FileUpload, recipe: Recipe, progress: {percentage: number}) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
        recipe.imageUrl = uploadTask.snapshot.downloadURL;
        recipe.imageName = fileUpload.name;
        this.recipeService.update(recipe);
      }
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(this.basePath).push(fileUpload);
  }

  deleteFileUpload(fileUpload: FileUpload, recipe: Recipe) {
    this.deleteFileDatabase(fileUpload.$key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
        recipe.imageName = null;
        recipe.imageUrl = null;
        this.recipeService.update(recipe);
      })
      .catch(error => console.log(error))
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key)
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref()
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

}
