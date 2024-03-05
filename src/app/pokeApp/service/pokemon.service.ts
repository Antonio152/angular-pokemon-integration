import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public pokemon!: Pokemon
  private baseUrl = "https://pokeapi.co/api/v2/pokemon"

  constructor(private http: HttpClient) {
   /*  this.getFromLocalStorage() */
  }

  /* Search pokemons */
  apiPokemon(query: string):Observable<Pokemon> {
    const url = `${this.baseUrl}/${query}`
    return this.http.get<Pokemon>(url)
    .pipe(
      catchError(()=> of({} as Pokemon)),
      tap((pokemon) => {
        if(!pokemon) return;
        this.pokemon = pokemon
      })
    )
  }

  /* Persist the values */
  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.pokemon))
  }

  private getFromLocalStorage(){
    if(localStorage.getItem('cacheStore')){
      this.pokemon = JSON.parse(localStorage.getItem('cacheStore')!)
    }
  }


}
