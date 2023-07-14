import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //觀察新的值
  ingredientsChanges = new EventEmitter<Ingredients[]>();
  private ingredients:Ingredients[]=[
    new Ingredients('Apple', 10),
    new Ingredients('Banana', 3),
  ];
  constructor() { }

  getIngredient(){
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredients){
    this.ingredients.push(ingredient);
    this.ingredientsChanges.emit(this.ingredients.slice());
  }

  //一次添加多個項目
  addIngredients(ingredients:Ingredients[]){
    // for ( let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanges.emit(this.getIngredient());
  }
}
