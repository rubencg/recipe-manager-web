import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FoodTime, Group, Unit, FoodGroup, Difficulty, Week } from '../models/interfaces';

@Injectable()
export class WeekRecipeService {
  weekRecipeRef: Observable<any[]>;
  weeks: Week[];

  constructor(private db: AngularFireDatabase) { 
    this.weekRecipeRef = db.list('weekRecipes').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getAllWeeks(){
    this.weekRecipeRef.subscribe(weeks => this.weeks = weeks);
    return this.weekRecipeRef;
  }

  save(week: Week){
    this.db.list('weekRecipes').push(week);
  }
  update(week: Week){
    this.db.list('weekRecipes').update(week.key, week);
  }

}