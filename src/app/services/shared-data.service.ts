import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonApi } from '../models/pokemon.model';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private behaviorSubject = new BehaviorSubject<Pokemon[]>([]);
  private pokemonNameSubject = new BehaviorSubject<string>('');
  pokemonName$ = this.pokemonNameSubject.asObservable();
  pokemon$ = this.behaviorSubject.asObservable();

  setPokemonData (Data : Pokemon[]){
    this.behaviorSubject.next(Data);
    console.log('setdone');
  }

  setPokemonName(name: string) {
    this.pokemonNameSubject.next(name);
    console.log('setdone');

  }
  
}
