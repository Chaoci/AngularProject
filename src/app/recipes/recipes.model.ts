import { Ingredients } from './../shared/ingredients.model';
export class Recipes{
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredients[];

    constructor(name:string, desc:string, imagePath:string,ingredients:Ingredients[]){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingredients = ingredients;
    }
}