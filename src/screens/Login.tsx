import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { login, verificaCPF } from '../services';
import type { ScreenProps } from '../context/modal/interfaces';
import { useModal } from '../context/modal';

interface LoginProps {
  navigation?: any;
  route?: any;
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const Login: React.FC<LoginProps> = ({ navigation, screenProps }) => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [responseFinger, setResponseFinger] = useState(false);
  const [responseId, setResponseId] = useState('');
  const [ativarCampoSenha, setAtivarCampoSenha] = useState(false);
  const [fingerErro, setFingerErro] = useState(false);

  const { openModal } = useModal();

  useEffect(() => {
    // Atualiza o estado fingerErro quando route.params.fingerErro mudar
    //console.log('route.params?.fingerErro :', route.params?.fingerErro);

    // todo: arrumar o props do finger
    // setFingerErro(route.params?.fingerErro || false);

    setFingerErro(screenProps?.fingerError || false);
  }, [screenProps?.fingerError]);

  useEffect(() => {
    const cpfs = cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '')
      .replace(',', '')
      .replace('.', '')
      .replace(' ', '');
    const consultarAPI = async () => {
      try {
        const responseCPF = await verificaCPF(cpfs);
        setResponseId(responseCPF.person_id);
        setResponseFinger(responseCPF.finger);

        if (responseCPF.finger === false) {
          setSenha('');
          setAtivarCampoSenha(true);
        } else if (fingerErro) {
          setSenha('');
          setAtivarCampoSenha(true);
          setResponseFinger(false);
        }
      } catch (error) {
        console.error('Erro na consulta à API:', error);
      }
    };

    if (cpfs.length > 10) {
      consultarAPI();
    } else {
      setResponseFinger(false);
      //console.log('setAtivarCampoSenha :', ativarCampoSenha);
      //console.log('cpfs.length :', cpfs.length);
      setAtivarCampoSenha(false);
    }

    // todo: verificar o focus aqui da tela
    // Ajuste para definir ativarCampoSenha como false ao retornar à tela de login
    // const unsubscribe = navigation.addListener('focus', () => {
    //   setAtivarCampoSenha(false);
    //   handleLimparCPF();
    // });

    // return unsubscribe;
  }, [cpf, fingerErro, navigation]);

  const handleLogin = async () => {
    if (!cpf || cpf.length < 11 || !/^\d+$/.test(cpf) || senha === '') {
      Alert.alert('Erro', 'Por favor, informe seu CPF');
      return;
    }

    try {
      const response = await login(cpf, senha);
      var jsonString = JSON.stringify(response);

      if (jsonString.includes('person_id')) {
        if (senha !== '' && senha.length >= 1 && fingerErro) {
          setFingerErro(false);
          openModal({
            type: 'logado',
          });
        } else if (response.finger === false && ativarCampoSenha) {
          openModal({
            type: 'mainCamera',
            screenProps: {
              id: response.person_id,
              cpf: response.person_id,
            },
          });
        } else {
          openModal({
            type: 'validaFinger',
            screenProps: {
              id: response.person_id,
              cpf: response.person_id,
            },
          });
        }
      } else if (jsonString.includes('erro')) {
        if (jsonString.includes('Invalid login')) {
          Alert.alert('Usuário', 'CPF ou Senha incorreta!');
        } else {
          Alert.alert(
            'Usuário não cadastrado',
            'Por favor, cadastre-se antes de fazer o login.'
          );
        }
      } else {
        Alert.alert(
          'Erro',
          'Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Usuário não cadastrado',
        'Por favor, cadastre-se antes de fazer o login.'
      );
    }
  };

  const handleDigital = async () => {
    if (
      senha !== '' &&
      senha.length >= 1 &&
      !ativarCampoSenha &&
      !responseFinger
    ) {
      handleLogin();
    } else {
      try {
        openModal({
          type: 'validaFinger',
          screenProps: {
            id: responseId,
            cpf: cpf,
          },
        });
      } catch (error) {
        Alert.alert(
          'Usuário não cadastrado',
          'Por favor, cadastre-se antes de fazer o login.'
        );
      }
    }
  };

  const handleCadastro = () => {
    openModal({
      type: 'cadastroScreen',
    });
  };

  const handleProvaVida = () => {
    openModal({
      type: 'provaVidas',
      screenProps: {
        id: responseId,
        cpf: cpf,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../src/assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Faça seu login</Text>
        <TextInput
          placeholderTextColor={'#000'}
          style={styles.input}
          placeholder="CPF"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text) => {
            setCpf(text);
          }}
        />
        {ativarCampoSenha && !responseFinger && (
          <TextInput
            placeholderTextColor={'#000'}
            style={styles.input}
            placeholder="Digite a senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={(text) => setSenha(text)}
            // todo: verifica se o editable substitui o disabled
            editable={!responseFinger} // Desativa o campo de senha se responseFinger for true
          />
        )}
        {!responseFinger ? (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleDigital}>
            <Text style={styles.buttonText}>Entrar com a Digital</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.cadastroButton}
          onPress={handleCadastro}
        >
          <Text style={styles.cadastroButtonText}>Cadastrar novo usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cadastroButton}
          onPress={handleProvaVida}
        >
          <Text style={styles.cadastroButtonText}>Prova Vida</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
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
    color: '#000',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#00bfff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  cadastroButton: {
    width: '80%',
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cadastroButtonText: {
    fontSize: 16,
    color: '#00bfff',
  },
  logo: {
    width: 500,
    height: 250,
    resizeMode: 'contain',
  },
});
