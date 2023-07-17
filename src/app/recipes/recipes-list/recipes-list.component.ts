import { DataStorageService } from './../../data-storage.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipes>();
  subscription : Subscription;
  initSubscription : Subscription;

  recipes: Recipes[];
  constructor(private recipeService: RecipeService, private router:Router, private route: ActivatedRoute, private dataStorageService : DataStorageService) { }

  ngOnInit(): void {
    // this.initSubscription = this.dataStorageService.fetchRecipes().subscribe((response:Recipes[])=>{
    //   console.log(response);
    //   this.recipes = response; 
    // });
    //如果觀察到改變 那個初始化整個recipe的內容再透或下面的getRecipes()讀取資料
    this.subscription = this.recipeService.recipesChanged.subscribe(
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.initSubscription.unsubscribe();
  }

}
