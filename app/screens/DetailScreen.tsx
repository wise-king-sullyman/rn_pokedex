import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import PokeProvider from '../components/PokeContext';

type Props = {};

export const PokemonDetailScreen: React.FC<Props> = ({ route }) => {
  const { pokemonData } = route.params
  const { name, image } = pokemonData;


  // I wasn't sure if "Display the Pokemon's image full width" in the stories
  // referred to the image's full width, or the full width of the screen.

  // I elected to go with the full width of the screen and compute the image
  // height to maintain it's aspect ratio.
  const [imageDimensions, setImageDimensions] = useState({})

  const computeImageDimensions = (image) => {
    const windowWidth = Dimensions.get('window').width;
    Image.getSize(image, (width, height) => {
      const scaleFactor = windowWidth / width
      setImageDimensions({ width: windowWidth, height: scaleFactor * height })
    })
  }

  return (
    <PokeProvider>
      <View style={styles.container}>
        <View>
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
        </View>
      </View>
    </PokeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    fontSize: 42,
    fontWeight: '600',
    textAlign: 'center',
  },
});
