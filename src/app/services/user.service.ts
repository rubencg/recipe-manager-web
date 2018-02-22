import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

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

}
