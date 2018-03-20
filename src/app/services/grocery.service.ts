import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { GroceryList } from './recipe.service';
import { AuthenticationService } from './authentication.service';
import * as _ from 'lodash';


@Injectable()
export class GroceryService {
  userId: string;
  groceryRefRef: Observable<any[]>;
  groceries: GroceryList[];

  constructor(private db: AngularFireDatabase, private authService: AuthenticationService) { 
    this.groceryRefRef = db.list('users/' + this.authService.userId +'/groceryLists').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.getAllGroceryLists();
  }

  getAllGroceryLists(){
    this.groceryRefRef.subscribe(groceries => this.groceries = groceries);
    return this.groceryRefRef;
  }

  save(groceryList: GroceryList){
    let g: GroceryList = _.first(_.filter(this.groceries, (gg: GroceryList) => gg.weekId == groceryList.weekId ));
    
    if(g){
      this.delete(g);
    }
    this.db.list('users/' + this.authService.userId +'/groceryLists').push(groceryList);
  }

  delete(groceryList: GroceryList){
    this.db.list('users/' + this.authService.userId +'/groceryLists').remove(groceryList.key);
  }

  update(groceryList: GroceryList){
    this.db.list('users/' + this.authService.userId +'/groceryLists').update(groceryList.key, groceryList);
  }

}


