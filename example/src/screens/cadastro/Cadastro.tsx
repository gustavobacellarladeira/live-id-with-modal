/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useModal } from '../../../../src/context/modal';

export const Cadastro = () => {
  const { openModal } = useModal();
  return (
    <View>
      <Text>Cadastro</Text>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'cadastroScreen',
            screenProps: {
              //   id: '322',
            },
            onClose() {
              console.log('onClose ID 1');
            },
            onSuccess: (response) => {
              console.log('onSuccess CADASTRO --> ', response);
              navigation.navigate('Dashboard');
            },
            onError(response) {
              console.log('onError -->', response);
            },
          });
        }}
      >
        <Text
          style={{
            color: 'black',
            fontSize: 30,
          }}
        >
          mainCamera
        </Text>
      </TouchableOpacity>
    </View>
  );
};
