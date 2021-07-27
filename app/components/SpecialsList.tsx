import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// I feel like I'm doing some weird TS stuff here, but I'm making the errors
// go away. I need to read docs and review other projecs more but I'm working
// on pretty limited time.
const SpecialAttack = ({ name, type, damage }: PokemonSpecial) => (
  <View style={styles.special}>
    <Text style={styles.specialName}>{name}</Text>
    <Text style={styles.specialInfo}>Type: {type}</Text>
    <Text style={styles.specialInfo}>Power: {damage}</Text>
  </View>
)

const SpecialsList = ({ data }: { data: PokemonSpecial[] }) => (
  <View>
    {data.map(({ name, type, damage }: PokemonSpecial) => (
      <SpecialAttack name={name} type={type} damage={damage} key={name} />
    ))}
  </View>
)

const styles = StyleSheet.create({
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
})

export default SpecialsList