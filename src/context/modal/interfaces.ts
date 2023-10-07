import React from 'react';
import type { ModalProps } from './components/Modal';

export type ModalTypes = 'screen1' | 'screen2';

export interface OpenModalProps extends ModalProps {
  type: ModalTypes;
}

export interface ModalContextProps {
  openModal: (modalProps: OpenModalProps) => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}
