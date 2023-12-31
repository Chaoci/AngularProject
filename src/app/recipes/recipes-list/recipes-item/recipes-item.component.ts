import { RecipeService } from '../../recipe.service';
import { Recipes } from './../../recipes.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: []
})
export class RecipesItemComponent implements OnInit {
  //input是為了在子層顯示data
  @Input() recipe: Recipes;
  //output要把在子層選擇的data傳遞給父層
  // @Output() recipeSelected = new EventEmitter<void>();

  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }
  // onSelected(){
  //   // this.recipeSelected.emit();
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
}
