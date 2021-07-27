interface PokemonData {
  id: string;
  number: string;
  name: string;
  image: string;
  fetchedAt: string;
  attacks: {
    special: Array<{
      name: string;
      type: string;
      damage: number;
    }>;
  };
}

type StackParamList = {
  Pokedex: undefined;
  Detail: { pokemonData: PokemonData};
}

