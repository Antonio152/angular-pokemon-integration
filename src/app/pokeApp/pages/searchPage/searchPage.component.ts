import { Component } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './searchPage.component.html',
})
export class SearchPageComponent {

  public pokemon: Pokemon | undefined;
  public pokemonName: string = "";

  constructor(private pokemonApi: PokemonService) { }

  //TODO: ADD AN INDICATOR FOR WHEN THE POKEMON IS NOT FOUND

  onSearch(searchValue: string) {
    this.pokemonName = searchValue
    this.pokemonApi.apiPokemon(searchValue.toLowerCase()).subscribe(pokemon => {
      if(!Object.keys(pokemon).length) return
      this.pokemon = pokemon
    })
  }

}
