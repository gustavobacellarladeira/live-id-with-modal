import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import type { ScreenProps } from '../context/modal/interfaces';
import { useModal } from '../context/modal';

interface ProvaVidaScreenProps {
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const ProvaVidas: React.FC<ProvaVidaScreenProps> = ({ screenProps }) => {
  const cpf = screenProps?.cpf;
  const id = screenProps?.id;
  const { openModal } = useModal();

  const isCPFValido = cpf !== '';
  const isIDValido = id !== '' && typeof id === 'number';

  useEffect(() => {
    // Verificar o CPF e ID e redirecionar para a tela correspondente
    if (!isCPFValido) {
      Alert.alert('Por favor, informe o CPF!');
      openModal({
        type: 'login',
      });
      return;
    } else if (!isIDValido) {
      Alert.alert('Usuário não cadastrado. Por favor, cadastre-se!');
      openModal({
        type: 'cadastroScreen',
      });
      return;
    } else {
      openModal({
        type: 'cameraProvaVidas',
        screenProps: {
          cpf: cpf,
          id: id,
        },
      });
    }
  }, [cpf, id, isCPFValido, isIDValido, openModal]);

  // Retorne null para evitar a renderização de qualquer conteúdo
  return null;
};
