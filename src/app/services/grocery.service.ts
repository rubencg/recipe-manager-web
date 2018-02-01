import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { GroceryGroup } from './recipe.service';
import { AuthenticationService } from './authentication.service';
import * as _ from 'lodash';


@Injectable()
export class GroceryService {
  userId: string;
  groceryRefRef: Observable<any[]>;
  groceries: GroceryGroup[];

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

  save(groceryGroup: GroceryGroup){
    let g: GroceryGroup = _.first(_.filter(this.groceries, (gg: GroceryGroup) => gg.weekId == groceryGroup.weekId ));
    
    if(g){
      this.delete(g);
    }
    this.db.list('users/' + this.authService.userId +'/groceryLists').push(groceryGroup);
  }

  delete(groceryGroup: GroceryGroup){
    this.db.list('users/' + this.authService.userId +'/groceryLists').remove(groceryGroup.key);
  }

}


