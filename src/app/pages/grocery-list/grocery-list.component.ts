import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  groceryGroup: any[] = [
    { id: 1, name: "Frutas", quantityNeeded: 4, quantityBought: 2 },
    { id: 2, name: "Verduras", quantityNeeded: 8, quantityBought: 5 },
    { id: 3, name: "Lacteos", quantityNeeded: 6, quantityBought: 8 },
    { id: 4, name: "Carnes", quantityNeeded: 43, quantityBought: 43 },
    { id: 5, name: "Especias", quantityNeeded: 5, quantityBought: 3 },
    { id: 6, name: "Otros", quantityNeeded: 14, quantityBought: 13 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
