export interface PokemonApi {
  name: string;
  url: string;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: PokemonApi;
}

export interface PokemonType {
  slot: number;
  type: PokemonApi;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: PokemonApi;
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonApi[];
}

export interface PokemonCharacteristic {
  id: number;
  gene_modulo: number;
  possible_values : number[];
  highest_stat: PokemonApi;
  descriptions: { description: string; language: PokemonApi }[];
}
