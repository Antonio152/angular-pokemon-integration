import { Component, Input } from '@angular/core';
import { GiftsPokemons, Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'poke-card',
  template: `

  <div *ngIf="pokemonName && !pokemon; else card" class="text-center mt-10">
  <h1>No pudimos encontrar a un pokemon con el nombre de <strong>{{pokemonName | uppercase}}</strong></h1>
  <h2 class="mt-3">Prueba buscando otro pokemon</h2>
  </div>

  <ng-template #card>
    <div class="flex justify-center" *ngIf="pokemon">
      <div
        class="my-10 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-800 md:max-w-3xl md:flex-row"
      >
        <img
          class="h-40 w-40 rounded-t-lg object-none m-auto md:h-auto md:!rounded-none md:!rounded-l-lg"
          [src]="giftPokemon(pokemon)"
          alt=""
        />
        <!-- <shared-slider [slides]="spritesArray" ></shared-slider> -->
        <div class="flex flex-col justify-start p-6">
          <h5
            class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50"
          >
            {{ pokemon.name | uppercase }}
          </h5>

          <div class="mt-2">
            <strong>Tipo: </strong>
            <span *ngFor="let typeV of pokemon.types; let i = index">{{typeV.type.name}}{{i + 1 < pokemon.types.length ? "," : "."}} </span>
          </div>

          <div class="grid grid-cols-3 grid-rows-2 gap-x-6 gap-y-2 mt-5 mb-1" >
            <ng-container *ngFor="let stats of pokemon.stats;  let i = index" >
              <span class="flex items-center"><strong>{{statsCad[pokemon.stats[i].stat.name]}}:</strong>{{pokemon.stats[i].base_stat}}</span>
            </ng-container>
          </div>
          <div class="mt-7">
            <a [routerLink]="['/pokemon', pokemon.name]" class="cursor-pointer py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              Ver mas
            </a>
          </div>
        </div>
      </div>
    </div>
  </ng-template>

  `,
  styleUrl: './pokeCard.component.scss',
})
export class PokeCardComponent {
  @Input()
  public pokemon: Pokemon | undefined;

  @Input()
  public pokemonName: string = '';

  // Add index signature to statsCad object
  public statsCad: { [key: string]: string } = {
    "hp":"Salud",
    "attack":"Ataque",
    "defense":"Defensa",
    "special-attack":"Ataque",
    "special-defense":"Defensa",
    "speed":"Velocidad",
  }

  giftPokemon (pokemon:Pokemon):String{
    const onlyGifts = Object.values(pokemon.sprites!)[8] as GiftsPokemons;
    return onlyGifts.showdown.front_shiny;
  }

}
