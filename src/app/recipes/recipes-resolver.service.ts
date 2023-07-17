import { DataStorageService } from './../data-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipes } from './recipes.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipes[]>{

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }
  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipeService.getRecipes();
    //如果沒有新增項目那我就照常fetch 
    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    }else{
      return recipes;
    }
  }
}
