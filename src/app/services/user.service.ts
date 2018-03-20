import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticationService } from './authentication.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {

  configRef;

  constructor(private db: AngularFireDatabase, private authService: AuthenticationService) {
    this.configRef = db.list('users/' + this.authService.userId).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }


  setUsersQty(qty: number){
    localStorage.setItem('usersQty', qty.toString());
  }

  getUsersQty(): number{
    let usersQty = localStorage.getItem('usersQty');
    if(usersQty){
      return +usersQty;
    }else{
      localStorage.setItem('usersQty', '1');
      return 1;
    }
  }

  canSetFavorites(){
    return this.configRef;
    // if(this.auth.currentUser){
    // return  this.db.object('users/' + this.auth.currentUser.uid).valueChanges();
    // }
  }

}
