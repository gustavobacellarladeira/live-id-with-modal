# liveid-react-native

`liveid-react-native` é um pacote que permite a integração do LiveID em aplicações React Native. Entre em contato com a empresa pra mais detalhes e permissoes de uso. !todo: colocar link de contato da empresa aqui

## Installation

To install `liveid-react-native`, you can use npm or yarn:

```bash
npm install liveid-react-native
```

or

```bash
yarn add liveid-react-native
```

## Como usar

Exemplo de uso de todos os métodos disponíveis:

### useModal

o hook useModal retorna o método openModal, que é responsável por abrir o modal de autenticação do LiveID. Porém, antes de usar o hook, é necessário que você tenha o ModalProvider em volta da sua aplicação, como no exemplo abaixo:

```jsx
// App.tsx / jsx;

import React from 'react';
import { Routes } from './routes/Routes';
import { NavigationContainer } from '@react-navigation/native';

import { ModalProvider } from 'react-native-live-id-sdk';

export default function App() {
  return (
    <NavigationContainer>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </NavigationContainer>
  );
}

// Routes.tsx / jsx;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { Dashboard } from '../screens/dashboard/Dashboard';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

// HomeScreen.tsx / jsx;
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
        <Text style={styles.textExplicativoTitle}>
          FUNCAO PARA CADASTRAR UM USUARIO TESTE E PEGAR O ID PARA AS DEMAIS
          FUNCOES ( DIGITAL, LOGIN, PROVA DE VIDA ){' '}
        </Text>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!person?.person_id) {
              Alert.alert('Crie um usuário teste primeiro');
              return;
            }
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
            'Cadastrar digital ( id: ' + person?.person_id + ')
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!person?.person_id) {
              Alert.alert('Crie um usuário teste primeiro');
              return;
            }
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!person?.person_id) {
              Alert.alert('Crie um usuário teste primeiro');
              return;
            }
            openModal({
              type: 'cameraProvaVidas',
              screenProps: {
                id: person?.person_id,
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


// Dashboard.tsx / jsx;
import React from 'react';
import { Text, View } from 'react-native';

export const Dashboard = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: 'black',
          fontSize: 30,
        }}
      >
        Dashboard
      </Text>
    </View>
  );
};
```

### openModal

O método openModal recebe um objeto com os seguintes parâmetros:

- type: string - tipo de modal que será aberto. Atualmente, só temos o tipo 'validaFinger'
- screenProps: object - objeto com as propriedades que serão passadas para o modal
- onClose: function - função que será executada quando o usuário fechar o modal
- onSuccess: function - função que será executada quando o usuário der sucesso na autenticação
- onError: function - função que será executada quando o usuário der erro na autenticação

## type

O tipo de modal que será aberto. Atualmente, só temos o tipo 'validaFinger'

validaFinger: modal de autenticação por biometria para o LiveID, que pode ser usado para autenticar o usuário ou para validar a identidade do usuário.

obs: precisa passar o id do usuário no screenProps

## screenProps

Objeto com as propriedades que serão passadas para o modal

id: string - id do usuário que será autenticado ou validado

## onClose

Função que será executada quando o usuário fechar o modal

## onSuccess

Função que será executada quando o usuário der sucesso na autenticação

obs: você pode fazer o que quiser com o response, dando sucesso na autenticação

## onError

Função que será executada quando o usuário der erro na autenticação

obs: você pode fazer o que quiser com o response, dando erro na autenticação

### Exemplo de uso do openModal

```jsx
const { openModal } = useModal();

openModal({
  type: 'validaFinger',
  screenProps: {
    id: '321',
  },
  onClose: () => {
    console.log('onClose');
    // aqui é quando o usuário fecha o modal
  },
  onSuccess: (response) => {
    console.log('onSuccess --> ', response);
    // aqui você pode fazer o que quiser com o response, dando sucesso na autenticação
  },
  onError(response) {
    console.log('onError -->', response);
    // aqui você pode fazer o que quiser com o response, dando erro na autenticação
  },
});
```

### Exemplo de uso completo

```jsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useModal } from 'liveid-react-native';

export const LoginScreen = () => {
  const { openModal } = useModal();

  const validaFingerHandler = () => {
    openModal({
      type: 'validaFinger',
      screenProps: {
        id: '321',
      },
      onClose: () => {
        console.log('onClose');
      },
      onSuccess: (response) => {
        console.log('onSuccess --> ', response);
      },
      onError(response) {
        console.log('onError -->', response);
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={validaFingerHandler}>
        <Text style={styles.text}>validar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  button: {
    marginTop: 20,
  },
  text: {
    color: 'black',
    fontSize: 30,
  },
});
```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the LICENSE file for details.
