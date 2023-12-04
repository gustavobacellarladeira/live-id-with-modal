import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ModalContextProps,
  ModalProviderProps,
  OpenModalProps,
} from './interfaces';
import { ModalScreen } from './components/Modal';

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export const ModalProvider: React.FC<ModalProviderProps> = (props) => {
  const { children } = props;
  const modalRef = useRef<ModalScreen>(null);
  const [modalConfigs, setModalConfigs] = useState<OpenModalProps | undefined>(
    undefined
  );

  const openModal = (modalProps: OpenModalProps) => {
    setModalConfigs(modalProps);

    return modalRef.current?.open();
  };

  const closeModal = () => {
    setModalConfigs(undefined);

    return modalRef.current?.close();
  };

  const renderModal = useMemo(() => {
    if (!modalConfigs) return;

    return (
      <ModalScreen
        ref={modalRef}
        modalConfigs={modalConfigs}
        onClose={modalConfigs.onClose}
        onSuccess={modalConfigs.onSuccess}
        onError={modalConfigs.onError}
      />
    );
  }, [modalConfigs]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {renderModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within an useModal');
  }

  return context;
};
