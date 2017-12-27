import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: any[] = [
    { id: 1, name: "Curry de garbanzos" },
    { id: 2, name: "Ensalada de Quinoa" },
    { id: 3, name: "Parfait de guayaba" },
    { id: 5, name: "Smoothie de pepino" },
    { id: 14, name: "Ragu de Res" },
    { id: 15, name: "Pizza vegana" },
    { id: 16, name: "Tu cara de res" },
  ]

  constructor() { }

  ngOnInit() {
  }

}
