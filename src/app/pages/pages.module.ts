import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, LoginComponent, GroceryListComponent]
})
export class PagesModule { }
