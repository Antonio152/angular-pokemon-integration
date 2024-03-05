import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonPageComponent } from './pages/pokemonPage/pokemonPage.component';
import { SearchPageComponent } from './pages/searchPage/searchPage.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PokeCardComponent } from './components/pokeCard/pokeCard.component';



@NgModule({
  declarations: [
    PokemonPageComponent,
    SearchPageComponent,
    PokeCardComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule
  ],
  exports: [
    PokemonPageComponent,
    SearchPageComponent,
    PokeCardComponent
  ]
})
export class PokemonModule { }
