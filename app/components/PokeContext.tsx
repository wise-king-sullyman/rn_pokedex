import React, { createContext, Context, useState } from "react";
import View from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

type PokeContextType = { savePokemon: (pokemon: PokemonData) => void, favPokemon: PokemonData | null };

const initialContext: PokeContextType = { savePokemon: () => { }, favPokemon: null }

export const PokeContext: Context<PokeContextType> = React.createContext(initialContext)

const PokeProvider: React.FC<{}> = ({ children }) => {
  const [favPokemon, setFavePokemon] = useState<PokemonData | null>(null)

  async function savePokemon(pokemon: PokemonData) {
    try {
      const jsonValue = JSON.stringify(pokemon)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e)
    }

    setFavePokemon(pokemon);

    console.log(`fav pokemon is ${favPokemon}`)
  }

  return (
    <PokeContext.Provider value={{ savePokemon, favPokemon }}>
      {children}
    </PokeContext.Provider>
  )
}

export default PokeProvider