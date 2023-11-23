/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useModal } from 'react-native-live-id-sdk';

export const HomeScreen = () => {
  const { openModal } = useModal();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'cadastroScreen',
            screenProps: {
              id: '123',
            },
            onClose() {
              console.log('onClose DONE 1');
            },
            onSuccess: () => {
              console.log('onSuccess');
            },
          });
        }}
      >
        <Text>CadastroScreen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'mainCamera',
            screenProps: {
              id: '123',
            },
            onClose: () => {
              console.log('ONCLOSE NA HOME');
            },
            onSuccess: () => {
              console.log('onSuccess HOME');
            },
            onError: () => {
              console.log('onError HOME');
            },
          });
        }}
      >
        <Text>MainCamera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'ajuda',
            screenProps: {
              id: '09090909',
            },
          });
        }}
      >
        <Text>ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'logado',
            screenProps: {
              id: 'asdsadad',
            },
          });
        }}
      >
        <Text>logado</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'login',
            screenProps: {
              id: '1231',
            },
          });
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
