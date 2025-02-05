export interface Language {
  name: string;
  url: string;
}

export interface FlavorText {
  flavor_text: string;
  language: Language;
}

export interface Description {
  description: string;
  language: Language;
}

export interface Habitat {
  name: string | null;
  url: string | null;
}

export interface EggGroup {
  name: string;
  url: string;
}

export interface EvolutionChain {
  url: string;
}

export interface Color {
  name: string;
  url: string;
}

export interface GrowthRate {
  name: string;
  url: string;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: {
      name: string;
      url: string;
  };
}

export interface Variety {
  is_default: boolean;
  pokemon: {
      name: string;
      url: string;
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  habitat: Habitat | null;
  flavor_text_entries: FlavorText[];
  descriptions: Description[];
  genera: { genus: string; language: Language }[];
  generation: {
      name: string;
      url: string;
  };
  growth_rate: GrowthRate;
  egg_groups: EggGroup[];
  color: Color;
  shape: {
      name: string;
      url: string;
  };
  varieties: Variety[];
  evolution_chain: EvolutionChain;
  pokedex_numbers: PokedexNumber[];
}