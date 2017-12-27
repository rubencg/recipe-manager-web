import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: any[] = [
    { name: "Curry de garbanzos" },
    { name: "Ensalada de Quinoa" },
    { name: "Parfait de guayaba" },
    { name: "Smoothie de pepino" },
    { name: "Ragu de Res" },
    { name: "Pizza vegana" },
    { name: "Tu cara de res" },
  ]

  constructor() { }

  ngOnInit() {
  }

}
