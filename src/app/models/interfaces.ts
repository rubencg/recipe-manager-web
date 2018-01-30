import { Recipe } from "../services/recipe.service";

export enum Unit{
    oz,
    pz,
    cup,
    tsp,
    tbsp,
    hf,
    shf,
    lb
}

export enum FoodTime{
    Breakfast,
    AMSnack,
    Lunch,
    PMSnack,
    Dinner
}

export enum FoodGroup{
    Fruit,
    Vegetable,
    Grains,
    Dairy,
    Proteins,
    Others
}

export enum Group {
    A,
    B,
    C,
    D
}

export enum Difficulty {
    Easy,
    Medium,
    Difficult
}

export interface Week{
    key?: string;
    name: string;
    recipes: WeekRecipe[];
}

export interface WeekRecipe{
    DayOrderId: number; //1-7 Monday - Sunday
    FoodTime: FoodTime;
    RecipeId: number;
    RecipeImage?: string;
    RecipeName: string;
}