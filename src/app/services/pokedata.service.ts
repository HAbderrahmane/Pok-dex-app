import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonListResponse, PokemonCharacteristic} from '../models/pokemon.model';
import { Ability } from '../models/ability.model';
import { PokemonSpecies } from '../models/pokemon-species.model';

@Injectable({
  providedIn: 'root',
})

export class PokedataService {
  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}pokemon/`);
  }

  getPokemonDetails(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}pokemon/${nameOrId}`);
  }

  getPokemonCharacteristic(id: number): Observable<PokemonCharacteristic> {
    return this.http.get<PokemonCharacteristic>(`${this.apiUrl}characteristic/${id}`);
  }

  getPokemonAbilities(id: number): Observable<Ability> {
    return this.http.get<Ability>(`${this.apiUrl}ability/${id}`);
  }

  getPokemonColor(id : number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.apiUrl}pokemon-species/${id}`);
  }
}
