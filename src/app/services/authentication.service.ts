import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.authState = this.afAuth.authState
    .switchMap(user => {
      if (user) {
        return Observable.of(user);
      } else {
        return Observable.of(null)
      }
    })
   }

  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((data) =>{
      this.router.navigate(['/home']);
    });
  }

  authorizeUser(data){
    if(this.isAuthorized(data.user.email)){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/login']);
    }
  }

  // Cambiar para que vaya a base de datos y cheque por los correos autorizados
  isAuthorized(email: string): boolean{
    return email == "rubencg88@gmail.com";
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data) =>{
      this.router.navigate(['/home']);
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  isLogged(): boolean{
    return this.afAuth.auth.currentUser != null;
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }
}
