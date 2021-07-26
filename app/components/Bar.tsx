import React from "react";
import { View, Text, StyleSheet } from 'react-native';

type Props = { text: String }

const Bar: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.bar}>
      <Text style={styles.barText}>{text}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'blue',
    height: 40,
  },
  barText: {
    color: 'white',
    fontSize: 16,
  }
})

export default Bar
