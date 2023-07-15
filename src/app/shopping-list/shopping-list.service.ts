import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //觀察新的值
  ingredientsChanges = new Subject<Ingredients[]>();
  startedEditting = new Subject<number>();
  private ingredients:Ingredients[]=[
    new Ingredients('Apple', 10),
    new Ingredients('Banana', 3),
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredients){
    this.ingredients.push(ingredient);
    this.ingredientsChanges.next(this.ingredients.slice());
  }

  updateIngredient(index:number, newIngredient:Ingredients){
    this.ingredients[index] = newIngredient;
    //改變了內容，要讓subscribe知道
    this.ingredientsChanges.next(this.ingredients.slice());
  }

  //一次添加多個項目
  addIngredients(ingredients:Ingredients[]){
    // for ( let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanges.next(this.getIngredients());
  }

  deletIngredient(index:number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanges.next(this.getIngredients());
  }
}
