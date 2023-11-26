import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ScreenProps } from '../context/modal/interfaces';

interface LogadoProps {
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const Logado: React.FC<LogadoProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Logado com senha.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
