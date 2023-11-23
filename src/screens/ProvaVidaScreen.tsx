import React, { useEffect } from 'react';
import type { ScreenProps } from '../context/modal/interfaces';

interface ProvaVidaScreenProps {
  navigation?: any;
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const ProvaVidas: React.FC<ProvaVidaScreenProps> = ({
  route,
  navigation,
}) => {
  const { cpf, id } = route.params;
  const cpfs = cpf
    .replace('.', '')
    .replace('.', '')
    .replace('-', '')
    .replace(',', '')
    .replace('.', '')
    .replace(' ', '');
  const isCPFValido = cpf !== '';
  const isIDValido = id !== '' && typeof id === 'number';

  //console.log("isCPFValido " + isCPFValido);
  //console.log("isIDValido " + isIDValido);

  useEffect(() => {
    // Verificar o CPF e ID e redirecionar para a tela correspondente
    if (!isCPFValido) {
      alert('Por favor, informe o CPF!');
      navigation.replace('Login');
      return;
    } else if (!isIDValido) {
      alert('Usuário não cadastrado. Por favor, cadastre-se!');
      navigation.replace('Cadastro');
      return;
    } else {
      //console.log("cpf " + cpf);
      //console.log("id " + id);
      navigation.replace('ValidaProvaVida', { cpf: cpf, id: id });
    }
  }, []);

  // Retorne null para evitar a renderização de qualquer conteúdo
  return null;
};
