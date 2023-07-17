import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NoRecipeComponent } from './no-recipe/no-recipe.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes= [
  { path: '' , redirectTo:'/recipes', pathMatch:'full'},
  { path: 'auth', component: AuthComponent},
  { path: 'recipes', component: RecipesComponent,canActivate:[AuthGuard] ,children:[
    { path: '', component: NoRecipeComponent},
    { path: 'new', component: RecipesEditComponent},
    { path: ':id', component: RecipesDetailComponent, resolve:[RecipesResolverService] },
    { path: ':id/edit', component: RecipesEditComponent, resolve:[RecipesResolverService]}
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
