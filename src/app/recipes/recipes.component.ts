import { Component, OnInit } from '@angular/core';
import { Recipes } from './recipes.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [],
})
export class RecipesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

    //透過service完成了數據的傳輸
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe:Recipes) => {
    //     this.selectedRecipe = recipe;
    //   }
    // )
  }


}
