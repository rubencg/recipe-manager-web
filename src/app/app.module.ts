import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { environment } from './environment';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { PagesModule } from './pages/pages.module';
import { AuthGuard } from './guards/auth.guard';
import { RecipeService } from './services/recipe.service';
import { WeekRecipeService } from './services/week-recipe.service';
import { GroceryService } from './services/grocery.service';
import { UserService } from './services/user.service';
import { UploadFileService } from './services/upload-file.service';


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
  providers: [ AuthenticationService, AngularFireAuth, AuthGuard, RecipeService, AngularFireDatabase, WeekRecipeService, GroceryService, UserService, UploadFileService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
