import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit {

  elements: any[] = [
    {name: "Rabano", quantity: 4},
    {name: "Papa", quantity: 4},
    {name: "Cebolla", quantity: 4},
    {name: "Perejil", quantity: 4},
    {name: "Cilantro", quantity: 4},
    {name: "Zanahoria", quantity: 4},
    {name: "Calabaza", quantity: 4},
    {name: "Pimiento verde", quantity: 4},
    {name: "Pimiento rojo", quantity: 4},
    {name: "Pimiento amarillo", quantity: 4},
    {name: "Benrenjena", quantity: 4},
  ];

  id: number;
  sub;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
  }

}
