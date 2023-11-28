/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useModal } from 'react-native-live-id-sdk';

export const LoginScreen = () => {
  const { openModal } = useModal();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'validaFinger',
            screenProps: {
              id: '321',
            },
            onClose() {
              console.log('onClose ID 1');
            },
            onSuccess: (response) => {
              console.log('onSuccess--> ', response);
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
          login ( id: 321)
        </Text>
      </TouchableOpacity>

      {/* <TextInput
        placeholderTextColor={'#000'}
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={(text) => {
          setCpf(text);
        }}
      /> */}
      {/* <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          openModal({
            type: 'validaFinger',
            screenProps: {},
            onClose() {
              console.log('onClose DONE ww');
            },
            onSuccess: (response: any) => {
              console.log('onSuccess -->', response);
              openModal({
                type: 'logado',
                screenProps: {
                  response: response,
                },
              });
            },
            onError: (response: any) => {
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
          validaFinger
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
});
