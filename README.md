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
