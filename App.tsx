/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './app/screens/HomeScreen';
import { PokemonDetailScreen } from './app/screens/DetailScreen';
import PokeProvider from './app/components/PokeContext';

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <PokeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Pokedex" component={HomeScreen} />
          <Stack.Screen
            name="Detail"
            component={PokemonDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PokeProvider>
  );
};

export default App;
