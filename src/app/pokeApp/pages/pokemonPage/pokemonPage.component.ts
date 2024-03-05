import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';
import { GiftsPokemons, Pokemon } from '../../interfaces/pokemon.interface';
import { map } from 'rxjs';
import { GiftsService } from '../../service/gifts.service';
import { Gift } from '../../interfaces/gifts.interfaces';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemonPage.component.html',
})
export class PokemonPageComponent implements OnInit{
  public pokemon: Pokemon | undefined;
  public pokemonName: string = "";
  public giftsList: Gift[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonApi: PokemonService,
    private giftApi: GiftsService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(map(({ id }) => {
        this.pokemonName = id
        return this.pokemonApi.apiPokemon(id)
      }))
      .subscribe(pokemon$ => {
        pokemon$.subscribe(pokemon => {
          if(!Object.keys(pokemon).length) return this.router.navigateByUrl('/')
          return this.pokemon = pokemon;
        });
      })

      this.activatedRoute.params
      .pipe(map(({ id }) => {
        this.pokemonName = id
        return this.giftApi.searchTag(id)
      }))
      .subscribe(gifts$ => {
        gifts$.subscribe(gifts => {
          return this.giftsList = gifts.data;
        });
      })


    /* .subscribe((resp) => {
        if(!Object.keys(resp).length) return this.router.navigateByUrl('/')
        return this.pokemon = resp
    }) */

    /* this.pokemonApi.apiPokemon(searchValue.toLowerCase()).subscribe(pokemon => {
      if(!Object.keys(pokemon).length) return
      this.pokemon = pokemon
    }) */
  }

  public statsCad: { [key: string]: string } = {
    "hp":"Salud",
    "attack":"Ataque",
    "defense":"Defensa",
    "special-attack":"Ataque",
    "special-defense":"Defensa",
    "speed":"Velocidad",
  }

  giftPokemon (backPokemon?:boolean):String{
    const onlyGifts = Object.values(this.pokemon!.sprites!)[8] as GiftsPokemons;
    if(backPokemon){
      return onlyGifts.showdown.back_shiny;
    }
    return onlyGifts.showdown.front_shiny;
  }


 }
