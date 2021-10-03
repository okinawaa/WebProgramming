export const POKEMON_SUCCESS = 'POKEMON_SUCCESS'
export const POKEMON_FAIL = 'POKEMON_FAIL'

export interface pokemonFailDispatch {
    type: typeof POKEMON_FAIL
}


export type PokemonAbility = {
    ability: {
        name: string
        url: string
    },
    is_hidden: boolean,
    slot: number
}
export type PokemonSprites = {
    front_default: string
}

export type PokemonType = {
    abilities: PokemonAbility[]
    sprites: PokemonSprites
}


export interface pokemonSuccessDispatch {
    type: typeof POKEMON_SUCCESS,
    payload: {
        abilities: PokemonAbility[]
        sprites: PokemonSprites
    }
}

export type PokemonDispatchType = pokemonSuccessDispatch | pokemonFailDispatch