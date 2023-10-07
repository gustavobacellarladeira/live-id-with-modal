/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { useModal } from '..';

interface Props {
  closeModal: () => void;
}

export const Screen1: React.FC<Props> = ({ closeModal }) => {
  const { openModal } = useModal();

  console.log('Screen1');
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={closeModal}>
        <Text>Close</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          openModal({
            type: 'screen2',
          });
        }}
      >
        <Text>GO TO 2</Text>
      </TouchableOpacity>
      <Text>Screen1</Text>
    </View>
  );
};
