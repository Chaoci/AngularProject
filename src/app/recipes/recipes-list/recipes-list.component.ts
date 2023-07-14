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
    this.recipes = this.recipeService.getRecipes();
  }
  // onRecipeSelected(recipe: Recipes){
  //   this.recipeWasSelected.emit(recipe);
  // }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
