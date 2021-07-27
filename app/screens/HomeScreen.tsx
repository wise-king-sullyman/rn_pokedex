import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { PokemonListItem } from '../components/PokemonListItem';
import { fetchPokemons } from '../services/pokemonService';

import Bar from '../components/Bar';
import PokeProvider from '../components/PokeContext';

type Props = {};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [pokemonsData, setPokemonsData] = useState<PokemonData[]>([]);

  const fetchPokemonData = async () => {
    const data = await fetchPokemons();
    setLoading(false);
    setPokemonsData(data);
  };

  useEffect(() => {
    setLoading(true);
    fetchPokemonData();
  }, []);

  const renderItem = ({ item }: { item: PokemonData }) => {
    return <PokemonListItem pokemonData={item} navigation={navigation} />;
  };

  return (
    <PokeProvider>
      <View style={styles.container}>
        <Bar text={`Pokemon Count: ${pokemonsData.length}`} />
        {!loading ? (
          <FlatList
            keyExtractor={item => item.id}
            data={pokemonsData}
            renderItem={renderItem}
          />
        ) : (
          <View style={styles.loading}>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    </PokeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
  },
});
