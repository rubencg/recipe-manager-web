import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { environment } from './environment';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { PagesModule } from './pages/pages.module';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    PagesModule
  ],
  providers: [ AuthenticationService, AngularFireAuth, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
