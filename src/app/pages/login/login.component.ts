import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  loginWithFacebook(){
    this.authService.loginWithFacebook();
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }

}
