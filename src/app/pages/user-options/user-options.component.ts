import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent implements OnInit {
  usersQty: number;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.usersQty = this.userService.getUsersQty();
  }

  save(){
    this.userService.setUsersQty(this.usersQty);
  }

}
