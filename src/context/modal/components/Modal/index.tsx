/* eslint-disable react-native/no-inline-styles */
import React, {
  type ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import Modal from 'react-native-modal';
import type { OpenModalProps, ScreenProps } from '../../interfaces';
import { CadastroScreen } from '../../../../screens/CadastroScreen';
import { MainCamera } from '../../../../screens/Camera';
import { Ajuda } from '../../../../screens/Ajuda';
import { Logado } from '../../../../screens/Logado';
import { Login } from '../../../../screens/Login';
import { ImageDisplayScreen } from '../../../../screens/ImageDisplayScreen';
import { CameraProvaVidas } from '../../../../screens/ProvaVidas';
import { ProvaVidas } from '../../../../screens/ProvaVidaScreen';
import { ValidaFinger } from '../../../../screens/ValidaFinger';

const modais = {
  cadastroScreen: (
    {
      modalClose,
    }: {
      modalClose: any;
    },
    screenProps?: ScreenProps
  ) => <CadastroScreen closeModal={modalClose} screenProps={screenProps} />,

  mainCamera: (
    {
      modalClose,
      onSuccess,
      onError,
    }: {
      modalClose: any;
      onSuccess?: () => void;
      onError?: () => void;
    },
    screenProps?: ScreenProps
  ) => (
    <MainCamera
      onError={onError}
      onSuccess={onSuccess}
      closeModal={modalClose}
      screenProps={screenProps}
    />
  ),

  ajuda: (
    {
      modalClose,
    }: {
      modalClose: any;
    },
    screenProps?: ScreenProps
  ) => <Ajuda closeModal={modalClose} screenProps={screenProps} />,

  login: (
    {
      modalClose,
    }: {
      modalClose: any;
    },
    screenProps?: ScreenProps
  ) => <Login closeModal={modalClose} screenProps={screenProps} />,

  logado: (
    {
      modalClose,
    }: {
      modalClose: any;
    },
    screenProps?: ScreenProps
  ) => <Logado closeModal={modalClose} screenProps={screenProps} />,

  imageDisplayScreen: (
    {
      modalClose,
    }: {
      modalClose: any;
    },
    screenProps?: ScreenProps
  ) => <ImageDisplayScreen closeModal={modalClose} screenProps={screenProps} />,

  cameraProvaVidas: (
    {
      modalClose,
    }: {
      modalClose: any;
    },
    screenProps?: ScreenProps
  ) => <CameraProvaVidas closeModal={modalClose} screenProps={screenProps} />,

  provaVidas: (
    {
      modalClose,
    }: {
      modalClose: any;
    },
    screenProps?: ScreenProps
  ) => <ProvaVidas closeModal={modalClose} screenProps={screenProps} />,

  validaFinger: (
    {
      modalClose,
    }: {
      modalClose: any;
    },
    screenProps?: ScreenProps
  ) => <ValidaFinger closeModal={modalClose} screenProps={screenProps} />,
};

export interface ErrorProps {
  errorType?: string;
  errorLocation?: string;
  errorData?: string;
}

export interface ModalProps extends ErrorProps {
  modalConfigs?: OpenModalProps | undefined;
  visible?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  // modalBottom?: boolean;
  // icon?: React.ReactElement;
  // title?: string;
  // description?: string;
  // buttonText?: string;
  // buttonLineText?: string;
  // linkText?: string;
  onClose?: () => void;
  value?: string;
  // onLinkPress?: () => void;
  // onButtonLinePress?: () => void;
  // onButtonPress?: (errorData?: string) => void;
}

export interface ModalType {
  open: () => void;
  close: () => void;
}

export const ModalBase: ForwardRefRenderFunction<ModalType, ModalProps> = (
  props,
  ref
) => {
  const { visible = false, modalConfigs, onClose, onSuccess, onError } = props;
  const [isVisible, setIsVisible] = useState(visible);

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);

  const close = useCallback(() => {
    onClose && onClose();
    // setIsVisible(false);
  }, [onClose]);

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={isVisible}
      swipeDirection="down"
      propagateSwipe={true}
      onSwipeComplete={close}
    >
      {modalConfigs &&
        modais[modalConfigs.type](
          {
            modalClose: close,
            onSuccess: onSuccess,
            onError: onError,
          },
          modalConfigs?.screenProps
        )}
    </Modal>
  );
};

export type ModalScreen = ModalType;
export const ModalScreen = forwardRef(ModalBase);
