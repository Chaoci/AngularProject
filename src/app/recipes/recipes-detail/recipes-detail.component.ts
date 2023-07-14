import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Recipes } from '../recipes.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe:Recipes;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  
}
