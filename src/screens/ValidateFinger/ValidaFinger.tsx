import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface ValidaFingerProps {}

export const ValidaFinger: React.FC<ValidaFingerProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Hello ValidaFinger</Text>
    </View>
  );
};
