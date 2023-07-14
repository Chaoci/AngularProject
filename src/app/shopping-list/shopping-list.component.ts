import { Ingredients } from './../shared/ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredients[];
  private igChangeSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanges.subscribe(
      (ingredients:Ingredients[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditting.next(index);
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }
  // onIngredientAdded(ingredient:Ingredients){
  //   this.ingredients.push(ingredient);
  // }

}
