import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokedataService } from '../../services/pokedata.service';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonCharacteristic } from '../../models/pokemon.model';
import { SharedDataService } from '../../services/shared-data.service';
import { PokemonSpecies } from '../../models/pokemon-species.model';
import { NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  providers: [PokedataService],
  selector: 'app-pokemon-details',
  standalone: true, 
  imports: [CommonModule, NgStyle,MatIcon],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  currentIndex: number = 0;
  pokemons: Pokemon[] = [];
  pokemonIdOrName!: number | undefined;
  pokemonDetails: PokemonCharacteristic | undefined;
  foundPokemon: any;
  abilities!: string;
  pokemonSpecies: PokemonSpecies | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokedataService: PokedataService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.sharedDataService.pokemon$.subscribe((data) => {
      this.pokemons = data;
      console.log('full data', this.pokemons);
      
      this.route.paramMap.subscribe(params => {
        this.pokemonIdOrName = params.get('id') ? Number(params.get('id')) : undefined;
        if (this.pokemonIdOrName !== undefined) {
          this.currentIndex = this.pokemonIdOrName;
          this.loadPokemon(this.currentIndex);
        }
      });
    });
  }

  loadPokemon(id: number) {
    this.foundPokemon = this.pokemons.find(p => p.id === id);
    console.log('Found Pokemon:', this.foundPokemon);

    if (this.foundPokemon) {
      this.pokedataService.getPokemonCharacteristic(this.foundPokemon.id)
        .subscribe(
          (details) => {
            this.pokemonDetails = details;
            console.log('these are the characteristics', this.pokemonDetails);
          },
          (error) => {
            console.error("Error fetching details:", error);
          }
        );
      this.pokedataService.getPokemonAbilities(this.foundPokemon.id)
        .subscribe(result => {
          this.abilities = result.name;
          console.log('Abilities:', result);
        });
      this.pokedataService.getPokemonColor(this.foundPokemon.id).subscribe
        ((result: PokemonSpecies) => {
          this.pokemonSpecies = result;
          console.log('Species:', this.pokemonSpecies.color.name);
        });
    }
  }

  getStatName(statName: string): string {
    switch (statName) {
      case 'hp': return 'HP';
      case 'attack': return 'ATK';
      case 'defense': return 'DEF';
      case 'special-attack': return 'SATK';
      case 'special-defense': return 'SDEF';
      case 'speed': return 'SPD';
      default: return statName;
    }
  }

  calculateStatPercentage(baseStat: number | undefined, maxValue: number | undefined): number {
    if (baseStat === undefined || maxValue === undefined) {
      return 0;
    }
    return (baseStat / maxValue) * 100;
  }

  nextPokemon() {
    if (this.currentIndex < this.pokemons.length) {
      this.currentIndex++;
      this.loadPokemon(this.currentIndex);
    }
  }

  previousPokemon() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
      this.loadPokemon(this.currentIndex);
    }
  }
}