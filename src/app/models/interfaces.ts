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
    A = 1,
    B = 2,
    C = 3,
    D = 4
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
    public static getGroupName(id: Group) {
        switch (id) {
            case Group.A:
                return "Grupo A";
            case Group.B:
                return "Grupo B";
            case Group.C:
                return "Grupo C";
            case Group.D:
                return "Grupo D";
            default:
                return "Grupo";
        }
    }

    public static getFoodTimeName(id: FoodTime) {
        switch (id) {
            case FoodTime.Breakfast:
                return "Desayuno";
            case FoodTime.AMSnack:
                return "A.M. Snack";
            case FoodTime.Lunch:
                return "Comida";
            case FoodTime.PMSnack:
                return "P.M. Snack";
            case FoodTime.Dinner:
                return "Cena";
            default:
                return "Hora del Dia";
        }
    }

    public static getFoodGroupName(id: FoodGroup) {
        switch (id) {
            case FoodGroup.Dairy:
                return "Lacteos";
            case FoodGroup.Fruit:
                return "Frutas";
            case FoodGroup.Grains:
                return "Cereales";
            case FoodGroup.Others:
                return "Otros";
            case FoodGroup.Proteins:
                return "Proteinas";
            case FoodGroup.Vegetable:
                return "Verduras";
        }
    }

    public static getUnitName(id: Unit) {
        return Unit[id];
    }
}