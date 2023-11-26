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
              id: '132',
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
        <Text
          style={{
            color: 'black',
            fontSize: 30,
          }}
        >
          CadastroScreen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'mainCamera',
            screenProps: {
              id: '132',
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
        <Text
          style={{
            color: 'black',
            fontSize: 30,
          }}
        >
          MainCamera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'ajuda',
            screenProps: {
              id: '132',
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
          ajuda
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'logado',
            screenProps: {
              id: '132',
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
          logado
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'login',
            screenProps: {
              id: '132',
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
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'imageDisplayScreen',
            screenProps: {
              id: '132',
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
          imageDisplayScreen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'cameraProvaVidas',
            screenProps: {
              id: '132',
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
          cameraProvaVidas
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'provaVidas',
            screenProps: {
              id: '132',
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
          provaVidas
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'validaFinger',
            screenProps: {
              id: '132',
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
          validaFinger
        </Text>
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
