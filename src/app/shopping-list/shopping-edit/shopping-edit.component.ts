import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') newIngredientName:ElementRef;
  @ViewChild('amountInput') newAmount:ElementRef;
  constructor() { }
  @Output() ingredientAdded = new EventEmitter<Ingredients>();
  ngOnInit(): void {
  }
  addNewIngredient(){
    const ingName = this.newIngredientName.nativeElement.value;
    const ingAmount = this.newAmount.nativeElement.value;
    const newIngredient = new Ingredients(ingName,ingAmount);
    this.ingredientAdded.emit(newIngredient);
    }
  }
