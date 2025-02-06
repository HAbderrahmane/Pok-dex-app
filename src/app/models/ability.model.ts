// models/Ability.ts

export interface Language {
    name: string;
    url: string;
}

export interface EffectEntry {
    effect: string;
    language: Language;
    short_effect?: string; // optional property
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: Language;
    version_group: {
        name: string;
        url: string;
    };
}

export interface PokemonDetail {
    is_hidden: boolean;
    pokemon: {
        name: string;
        url: string;
    };
    slot: number;
}

export interface Generation {
    name: string;
    url: string;
}

export interface Ability {
    id: number;
    name: string;
    is_main_series: boolean;
    effect_entries: EffectEntry[];
    flavor_text_entries: FlavorTextEntry[];
    generation: Generation;
    names: Language[];
    pokemon: PokemonDetail[];
}