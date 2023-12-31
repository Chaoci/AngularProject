import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipes } from './recipes.model';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  //讓EventEmitter放在Service可以省去中間個子層傳遞的複雜度
  // recipeSelected = new Subject<Recipes>();
  recipesChanged = new Subject<Recipes[]>();
  
  // private recipes: Recipes[]=[
  //   new Recipes('Curry', 'Green Curry super wonderful!','https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured-395x500.jpg',[
  //     new Ingredients('Meat', 20),
  //     new Ingredients('Onion', 10)
  //   ]),
  //   new Recipes('A test Recipe', 'second test','https://picturetherecipe.com/wp-content/uploads/2020/07/Butter-Chicken-PTR-Featured-395x500.jpg',[
  //     new Ingredients('Vegtable', 20),
  //     new Ingredients('French Fries', 10),
  //   ]),
  // ];
  private recipes:Recipes[]=[];
  setRecipes(recipes: Recipes[]){
    this.recipes = recipes;
    //因為改動了資料
    this.recipesChanged.next(this.getRecipes());
  }

  getRecipes(){
    // 這slice()沒有參數的話會回傳新的Array
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients:Ingredients[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipes){
    this.recipes.push(recipe);
    //利用subject的特性直接透過next (類似於emit)的方式給予值
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index:number, newRecipe:Recipes){
    this.recipes[index] = newRecipe;
    //利用subject的特性直接透過next
    this.recipesChanged.next(this.getRecipes());
  }

  deletRecipe(index:number){
    this.recipes.splice(index,1);
    //利用subject的特性直接透過next
    this.recipesChanged.next(this.getRecipes());
  }

  constructor(private shoppingListService:ShoppingListService) { }


}
