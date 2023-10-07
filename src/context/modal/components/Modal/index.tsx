/* eslint-disable react-native/no-inline-styles */
import React, {
  type ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import Modal from 'react-native-modal';
import { Screen1 } from '../../screens/Screen1';
import { Screen2 } from '../../screens/Screen2';

import type { OpenModalProps } from '../../interfaces';

const modais = {
  screen1: (modalClose: any) => <Screen1 closeModal={modalClose} />,
  screen2: (modalClose: any) => <Screen2 closeModal={modalClose} />,
};

export interface ErrorProps {
  errorType?: string;
  errorLocation?: string;
  errorData?: string;
}

export interface ModalProps extends ErrorProps {
  modalConfigs?: OpenModalProps | undefined;
  modalBottom?: boolean;
  icon?: React.ReactElement;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLineText?: string;
  linkText?: string;
  visible?: boolean;
  onClose?: () => void;
  onLinkPress?: () => void;
  onButtonLinePress?: () => void;
  onButtonPress?: (errorData?: string) => void;
}

export interface ModalType {
  open: () => void;
  close: () => void;
}

export const ModalBase: ForwardRefRenderFunction<ModalType, ModalProps> = (
  props,
  ref
) => {
  const { visible = false, modalConfigs } = props;
  const [isVisible, setIsVisible] = useState(visible);

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleOnCloseModal = () => {
    close();
  };

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={isVisible}
      swipeDirection="down"
      propagateSwipe={true}
      onSwipeComplete={handleOnCloseModal}
    >
      {modalConfigs && modais[modalConfigs.type](close)}
    </Modal>
  );
};

export type ModalScreen = ModalType;
export const ModalScreen = forwardRef(ModalBase);
