import React from 'react';
import type { ModalProps } from './components/Modal';

export type ModalTypes =
  | 'cadastroScreen'
  | 'mainCamera'
  | 'ajuda'
  | 'login'
  | 'logado'
  | 'imageDisplayScreen'
  | 'cameraProvaVidas'
  | 'provaVidas'
  | 'validaFinger'
  | 'cadastroFinger';

export interface ScreenProps {
  id?: string;
  cpf?: string;
  fingerError?: false;
  base64Image?: string;
  ativarCampoSenha?: boolean;
  onSuccessCadastro?: (req: any) => void;
  [key: string]: any;
}

export interface OpenModalProps extends ModalProps {
  type: ModalTypes;
  screenProps?: ScreenProps;
}

export interface ModalContextProps {
  openModal: (modalProps: OpenModalProps) => void;
  closeModal: () => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}
