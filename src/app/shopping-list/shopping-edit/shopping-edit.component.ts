import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
  
  @ViewChild('form') shopForm:NgForm;
  subscription: Subscription;
  editMode= false;
  editedItemIndex: number;
  edittedItem: Ingredients;

  // @ViewChild('nameInput') newIngredientName:ElementRef;
  // @ViewChild('amountInput') newAmount:ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }
  // @Output() ingredientAdded = new EventEmitter<Ingredients>();
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditting
      .subscribe(
        (index:number) => {
          this.editedItemIndex= index;
          this.editMode = true;
          this.edittedItem = this.shoppingListService.getIngredient(index);
          this.shopForm.setValue({
            name: this.edittedItem.name,
            amount: this.edittedItem.amount
          })
        }
      );

  }

  onAddItem(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
