import { formatDate } from '../utils/generalUtils';

type JSONResponse = {
  data?: {
    pokemons: Omit<PokemonData[], 'fetchedAt'>;
  };
  errors?: Array<{ message: string }>;
};

export const fetchPokemons = async (): Promise<PokemonData[]> => {
  const allPokemonsQuery = `
        query AllPokemonsQuery($first: Int!) {
            pokemons(first: $first) {
                id
                number
                name
                image
                attacks {
                    special {
                        name
                        type
                        damage
                    }
                }
            }
        }
    `;

  const response = await fetch('https://graphql-pokemon2.vercel.app/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query: allPokemonsQuery,
      variables: { first: 30 },
    }),
  });

  const { data, errors }: JSONResponse = await response.json();

  if (response.ok) {
    const pokemons = data?.pokemons;
    if (pokemons && pokemons.length > 0) {
      // add fetchedAt helper (used in the UI to help differentiate requests)
      return Object.assign(pokemons, { fetchedAt: formatDate(new Date()) });
    } else {
      return Promise.reject(new Error(`No pokemon found :("`));
    }
  } else {
    // handle the graphql errors
    const error = new Error(
      errors?.map(e => e.message).join('\n') ?? 'unknown',
    );
    return Promise.reject(error);
  }
};
