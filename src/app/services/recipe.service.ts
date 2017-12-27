import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {

  constructor() { 
    this.recipes.forEach(recipe => {
      recipe.ingredients = [
        "Ingrediente 1",
        "Ingrediente 2",
        "Ingrediente 3",
        "Ingrediente 4",
        "Ingrediente 5",
        "Ingrediente 6",
      ];
      recipe.instructions = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut nisi sed mauris aliquet lobortis lacinia nec diam. Aliquam vestibulum turpis ante, nec tincidunt magna pulvinar ac. Aliquam ullamcorper elit a massa efficitur mollis id at velit. Cras posuere euismod odio. Cras vitae tristique tellus. Praesent at vestibulum enim. Maecenas nec justo nec augue viverra ornare. Cras placerat, nulla eget pulvinar placerat, urna lectus iaculis enim, eget finibus ex sapien a mi.",
        "Pellentesque gravida iaculis elit at tincidunt. Quisque in enim lorem. Donec placerat accumsan ante, ut commodo neque. Curabitur et mauris elementum, ullamcorper augue aliquet, mollis purus. Integer condimentum cursus diam eu iaculis. In id nisi lacus. Donec porta dui nec odio egestas, ut iaculis augue aliquet. Cras lectus lacus, ultrices sit amet tristique eget, sagittis eget erat. Cras commodo euismod sem, ut commodo dolor tincidunt sit amet. Aenean feugiat neque ac neque efficitur faucibus. Aliquam nulla massa, pellentesque at ullamcorper eget, volutpat ac nisl. Duis vel elementum tortor. Nulla at feugiat justo."
      ];
    });

  }

  recipes: Recipe[] = [
    { id: 1, name: "Curry de garbanzos" },
    { id: 2, name: "Ensalada de Quinoa" },
    { id: 3, name: "Parfait de guayaba" },
    { id: 5, name: "Smoothie de pepino" },
    { id: 14, name: "Ragu de Res" },
    { id: 15, name: "Pizza vegana" },
    { id: 16, name: "Tu cara de res" },
  ]

  getAllRecipes() : Recipe[]{
    return this.recipes;
  }

}

export interface Recipe {
  id: number;
  name: string;
  ingredients?: string[];
  image?: string;
  instructions?: string[];
}