import { Component, OnInit } from '@angular/core';
import { Recipes } from './recipes.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe:Recipes;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe:Recipes) => {
        this.selectedRecipe = recipe;
      }
    )
  }


}
