import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonPageComponent } from './pages/pokemonPage/pokemonPage.component';
import { SearchPageComponent } from './pages/searchPage/searchPage.component';

const routes: Routes = [
  {
    path: 'search-pokemon',
    component: SearchPageComponent
  },
  {
    path: 'pokemon/:id',
    component: PokemonPageComponent
  },
  {
    path: '**',
    redirectTo: 'search-pokemon'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
