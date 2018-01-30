import { Recipe } from "../services/recipe.service";

export enum Unit {
    oz,
    pz,
    cup,
    tsp,
    tbsp,
    hf,
    shf,
    lb
}

export enum FoodTime {
    Breakfast = 1,
    AMSnack = 2,
    Lunch = 3,
    PMSnack = 4,
    Dinner = 5
}

export enum FoodGroup {
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

export interface Week {
    key?: string;
    name: string;
    recipes: WeekRecipe[];
}

export interface WeekRecipe {
    DayOrderId: number; //1-7 Monday - Sunday
    FoodTime: FoodTime;
    RecipeId: string;
    RecipeImage?: string;
    RecipeName: string;
}

export class Utils {
    public static getFoodTimeName(id: FoodTime) {
        switch (id) {
            case FoodTime.Breakfast:
                return "Desayuno";
                break;
            case FoodTime.AMSnack:
                return "A.M. Snack";
                break;
            case FoodTime.Lunch:
                return "Comida";
                break;
            case FoodTime.PMSnack:
                return "P.M. Snack";
                break;
            case FoodTime.Dinner:
                return "Cena";
                break;
            default:
                return "Hora del Dia";
                break;
        }
    }
}