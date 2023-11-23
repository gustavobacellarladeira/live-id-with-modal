/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import type { ScreenProps } from '../context/modal/interfaces';

interface LogadoProps {
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const Logado: React.FC<LogadoProps> = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logado com senha.</Text>
    </View>
  );
};
