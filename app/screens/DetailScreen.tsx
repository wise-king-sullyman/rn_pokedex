import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import PokeProvider from '../components/PokeContext';

import { RouteProp } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

type DetailRouteProp = RouteProp<StackParamList, 'Detail'>;

type Props = {
  route: DetailRouteProp
};

export const PokemonDetailScreen: React.FC<Props> = ({ route }) => {
  const { pokemonData } = route.params
  const { name, image, attacks: { special } } = pokemonData;


  // I wasn't sure if "Display the Pokemon's image full width" in the stories
  // referred to the image's full width, or the full width of the screen.

  // I elected to go with the full width of the screen and compute the image
  // height to maintain it's aspect ratio.
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })

  const computeImageDimensions = (image: string) => {
    const windowWidth = Dimensions.get('window').width;
    Image.getSize(image, (width, height) => {
      const scaleFactor = windowWidth / width
      setImageDimensions({ width: windowWidth, height: scaleFactor * height })
    })
  }

  const SpecialAttack = ({ name, type, damage }: PokemonSpecial) => (
    <View style={styles.special}>
      <Text style={styles.specialName}>{name}</Text>
      <Text style={styles.specialInfo}>Type: {type}</Text>
      <Text style={styles.specialInfo}>Power: {damage}</Text>
    </View>
  )

  const renderSpecial = ({ item }: { item: PokemonSpecial }) => (
    <SpecialAttack name={item.name} type={item.type} damage={item.damage} />
  )

  return (
    <PokeProvider>
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          onLoad={() => computeImageDimensions(image)}
          style={
            {
              width: imageDimensions.width,
              height: imageDimensions.height,
            }
          }
        />
        <Text style={styles.text}>{name}</Text>
        <FlatList data={special} keyExtractor={(item, index) => item + index} renderItem={renderSpecial} />
      </View>
    </PokeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 42,
    fontWeight: '600',
    textAlign: 'center',
  },
  special: {
    marginTop: 10,
    marginLeft: 30,
  },
  specialName: {
    fontSize: 24,
    fontWeight: '500',
  },
  specialInfo: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: 'left',
  },
});
