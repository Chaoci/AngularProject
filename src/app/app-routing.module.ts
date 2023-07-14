import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NoRecipeComponent } from './no-recipe/no-recipe.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';


const appRoutes: Routes= [
  { path: '' , redirectTo:'/recipes', pathMatch:'full'},
  { path: 'recipes', component: RecipesComponent, children:[
    { path: '', component: NoRecipeComponent},
    { path: 'new', component: RecipesEditComponent},
    { path: ':id', component: RecipesDetailComponent},
    { path: ':id/edit', component: RecipesEditComponent}
  ]},
  { path: 'shopping-list', component: ShoppingListComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports:[RouterModule],
})
export class AppRoutingModule { }
