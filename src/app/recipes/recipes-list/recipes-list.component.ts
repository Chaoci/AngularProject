import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipes>();

  recipes: Recipes[];
  constructor(private recipeService: RecipeService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    //如果觀察到改變 那個初始化整個recipe的內容再透或下面的getRecipes()讀取資料
    this.recipeService.recipesChanged.subscribe(
      (recipes:Recipes[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }
  // onRecipeSelected(recipe: Recipes){
  //   this.recipeWasSelected.emit(recipe);
  // }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
