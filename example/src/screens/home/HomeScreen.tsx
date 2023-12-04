/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useModal } from 'react-native-live-id-sdk';

export const HomeScreen = () => {
  const { openModal, closeModal } = useModal();
  const navigation = useNavigation();

  const [person, setPerson] = useState<{
    cpf: string;
    finger: boolean;
    person_id: string;
    status: string;
  } | null>(null);

  const [cameraResponse, setCameraResponse] = useState<any>(null);

  const handleSucessOnDigitalCadastrada = (response: any) => {
    setCameraResponse(response);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.textExplicativoTitle}>
          Logo abaixo temos alguns exemplos de como utilizar o SDK.
        </Text>
        <Text style={styles.textExplicativo}>
          <Text style={styles.textBold}> 1 - </Text>Aqui abaixo temos
          informacoes do usuario que foi cadastrado, caso ainda nao tenha,
          clique em CadastroScreen para cadastrar e depois testar as outras
          funcionalidades.
        </Text>
        {person ? (
          <View style={styles.containerPerson}>
            <Text style={styles.personText}>ID: {person?.person_id}</Text>
            <Text style={styles.personText}>CPF:{person?.cpf}</Text>
            <Text style={styles.personText}>STATUS: {person?.status}</Text>
            <Text style={styles.personText}>
              DIGITAL:{' '}
              {person?.finger ? 'Possui digital' : 'Não possui digital'}
            </Text>
          </View>
        ) : (
          <View style={styles.containerPerson}>
            <Text style={styles.textNoperson}>
              Clique em "Cadastrar usuário teste" para cadastrar e depois testar
              as outras funcionalidades.
            </Text>
          </View>
        )}

        {!person && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              openModal({
                type: 'cadastroScreen',
                screenProps: {},
                onClose() {
                  console.log('onClose validaFinger');
                },
                onSuccess: (response) => {
                  console.log('onSuccess --> ', response);
                  setPerson(response);
                  closeModal();
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
              Cadastrar usuário teste
            </Text>
          </TouchableOpacity>
        )}

        {person && (
          <Text style={styles.textExplicativo}>
            <Text style={styles.textBold}> 2 - </Text>Você criou um usuário e
            agora voce pode ou nao cadastrar a digital dele no sistema, para
            isso, você vai utilizar o id do usuário que foi criado no passo
            anterior. Na tela de Cadastro de Digital você vai clicar em
            "Cadastrar digital" e depois vai colocar o dedo no leitor de digital
            do celular para cadastrar a digital.
          </Text>
        )}

        {person && !person.finger && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              openModal({
                type: 'cadastroFinger',
                screenProps: {
                  id: person?.person_id,
                },
                onClose() {
                  console.log('onClose cadastroFinger');
                },
                onSuccess: (response) => {
                  console.log('onSuccess --> ', response);
                  handleSucessOnDigitalCadastrada(response);
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
              {cameraResponse?.status === '200'
                ? 'Digital cadastrada com sucesso'
                : 'Cadastrar digital ( id: ' + person?.person_id + ')'}
            </Text>
          </TouchableOpacity>
        )}

        {cameraResponse?.message && cameraResponse?.status === '404' && (
          <Text style={styles.textError}>{cameraResponse?.message}</Text>
        )}

        {person && (
          <>
            <Text style={styles.textExplicativo}>
              <Text style={styles.textBold}>3 - </Text>Funcoes que voce pode
              testar assim que tiver um id pra mandar para a tela
            </Text>

            <Text style={styles.textExplicativo}>
              Funcao de login com digital, voce vai clicar em "Login com
              digital" e depois vai colocar o dedo no leitor de digital do
              celular para fazer o login. ( para isso precisar ter o id )
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                openModal({
                  type: 'validaFinger',
                  screenProps: {
                    id: person?.person_id,
                  },
                  onClose() {
                    console.log('onClose validaFinger');
                  },
                  onSuccess: (response) => {
                    console.log('onSuccess --> ', response);
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
                Login com digital ( id: {person?.person_id})
              </Text>
            </TouchableOpacity>

            <Text style={styles.textExplicativo}>
              Funcao de prova de vida, camera que vai ser seus batimentos
              cardiacos, voce vai clicar em "Prova de vida" e depois vai colocar
              o dedo no leitor de digital do celular para fazer a prova de vida.
              ( para isso precisar ter o id )
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                openModal({
                  type: 'cameraProvaVidas',
                  screenProps: {
                    id: '321',
                  },
                  onClose() {
                    console.log('onClose cameraProvaVidas');
                  },
                  onSuccess: (response) => {
                    console.log('onSuccess --> ', response);
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
                Prova de vida ( id: {person?.person_id})
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerPerson: {
    width: '100%',
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'lightblue',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  personText: {
    fontSize: 16,
    color: '#000',
  },

  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textExplicativoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
  },
  textExplicativo: {
    fontSize: 16,
    color: '#000',
    margin: 10,
    fontStyle: 'italic',
  },
  textNoperson: {
    fontSize: 16,
    color: '#000',
    margin: 10,
    fontWeight: 'bold',
  },

  textError: {
    fontSize: 12,
    color: 'red',
    margin: 10,
    fontWeight: 'bold',
  },
});
