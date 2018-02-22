import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent implements OnInit {
  usersQty: number;
  constructor() {

  }

  ngOnInit() {
    let usersQty = localStorage.getItem('usersQty');
    if(usersQty){
      this.usersQty = +usersQty;
    }else{
      this.usersQty = 1;
      localStorage.setItem('usersQty', '1');
    }
  }

  save(){
    localStorage.setItem('usersQty', this.usersQty.toString());
  }

}
