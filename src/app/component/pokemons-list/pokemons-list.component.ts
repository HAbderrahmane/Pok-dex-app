import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokedataService } from '../../services/pokedata.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../design/search/search.component';
import { PokeCardComponent } from '../poke-card/poke-card.component';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PokemonApi, PokemonListResponse,Pokemon } from '../../models/pokemon.model';
import { forkJoin, Observable } from 'rxjs';
import { SharedDataService } from '../../services/shared-data.service';
@Component({
  selector: 'app-pokemons-list',
  standalone: true,
  imports: [CommonModule, SearchComponent, PokeCardComponent, MatIcon],
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent implements OnInit {

  pokemonList: PokemonApi[] = [];
  allPokemonDetails: Pokemon[] = [];
  filteredPokemons : Pokemon [] = [];

  constructor(
    private pokedataService: PokedataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private sharedDataService: SharedDataService
  ) {
    this.matIconRegistry.addSvgIcon(
      'pokeball',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/pokeball.svg')
    );
  }
  ngOnInit() {
    this.loadPokemonData();
  }

  loadPokemonData(): void {
    this.pokedataService.getPokemonList().subscribe({
      next: (response: PokemonListResponse) => {
        this.pokemonList = response.results;
        this.loadAllPokemonDetails();
      },
      error: (error) => {
        console.error("Error fetching Pokémon list:", error);
      }
    });
  }
  
  loadAllPokemonDetails(): void {
    if (!this.pokemonList || this.pokemonList.length === 0) return;
  
    const observables: Observable<Pokemon>[] = this.pokemonList.map((pokemon) =>
      this.pokedataService.getPokemonDetails(pokemon.name)
    );
  
    forkJoin(observables).subscribe({
      next: (pokemonDetailsArray: Pokemon[]) => {
        this.allPokemonDetails = pokemonDetailsArray;
        this.filteredPokemons = [...this.allPokemonDetails];
        console.log(this.allPokemonDetails);
        this.sharedDataService.setPokemonData(this.filteredPokemons);
      },
      error: (error) => {
        console.error("Error fetching Pokémon details:", error);
      }
    });
  }

  onSearch(query: string): void {
    if (query) {
      this.filteredPokemons = this.allPokemonDetails.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredPokemons = this.allPokemonDetails;
    }
  }

  setName (name : string){
    this.sharedDataService.setPokemonName(name);
  }
}
