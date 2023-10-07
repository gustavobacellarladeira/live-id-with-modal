/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';

interface Props {
  closeModal: () => void;
}

export const Screen2: React.FC<Props> = ({ closeModal }) => {
  console.log('Screen1');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={closeModal}>
        <Text>Close</Text>
      </TouchableOpacity>
      <Text>Screen2</Text>
    </View>
  );
};
