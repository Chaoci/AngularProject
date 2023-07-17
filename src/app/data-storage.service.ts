import { AuthService } from './auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipes } from './recipes/recipes.model';
import { RecipeService } from './recipes/recipe.service';
import { map, take, tap, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }
  stroeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://firstproject-71054-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }
  fetchRecipes() {
    return this.http.get<Recipes[]>('https://firstproject-71054-default-rtdb.firebaseio.com/recipes.json').pipe(
      map(recipes => {
        //與第一個function不同的map
        return recipes.map(recipes => {
          // 確保能夠讓下層的ingredient也能正確存入database
          return { ...recipes, ingredients: recipes.ingredients ? recipes.ingredients : [] }
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
  }
} 