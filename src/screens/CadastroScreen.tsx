import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { cadastro } from '../services';
import type { ScreenProps } from '../context/modal/interfaces';

export interface CadastroScreenProps {
  navigation?: any;
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const CadastroScreen: React.FC<CadastroScreenProps> = ({
  navigation,
  closeModal,
}) => {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {
    try {
      if (senha === confirmarSenha) {
        const response = await cadastro(cpf, nome, senha);
        var jsonString = JSON.stringify(response);
        if (jsonString.includes('person_id')) {
          if (response.finger === false) {
            navigation.navigate('Ajuda', { id: response.person_id });
          } else {
            navigation.navigate('Login');
          }
        } else if (jsonString.includes('User exists')) {
          Alert.alert('Usuário já cadastrado!');
          navigation.navigate('Login');
        } else if (jsonString.includes('erro')) {
          Alert.alert('Usuário não cadastrado', 'Por favor, cadastre-se!');
        } else {
          Alert.alert(
            'Erro',
            'Ocorreu um erro ao fazer o Cadastro. Por favor, tente novamente mais tarde.'
          );
        }
      } else {
        Alert.alert(
          'Erro',
          'As senhas não coincidem. Por favor, tente novamente.'
        );
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
      <Text style={styles.title}>Cadastro de usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a senha novamente"
        secureTextEntry={true}
        value={confirmarSenha}
        onChangeText={(text) => setConfirmarSenha(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
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
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#00bfff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  logo: {
    width: 500,
    height: 250,
    resizeMode: 'contain',
  },
});
