import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  pokemonData: PokemonData;
};

export const PokemonListItem: React.FC<Props> = ({ pokemonData }) => {
  const { name, image } = pokemonData;
  return (
    <View style={styles.wrapper}>
      <View style={styles.border}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    borderWidth: 1.5,
    height: 80,
    width: 80,
    borderRadius: 80,
    borderColor: '#f3726a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  image: {
    height: 50,
    width: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  wrapper: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e4',
  },
});
