import React, { useState } from 'react';
import type { ScreenProps } from '../../context/modal/interfaces';
import { AjudaCadastro } from './AjudaCadastro';
import { CameraCadastro } from './CameraCadastro';

interface CadastroFingerProps {
  closeModal: () => void;
  onError?: (response?: any) => void;
  onSuccess?: (response?: any) => void;
  screenProps?: ScreenProps;
}

export const CadastroFinger: React.FC<CadastroFingerProps> = ({
  closeModal,
  screenProps,
  onError,
  onSuccess,
}) => {
  const [showCamera, setShowCamera] = useState(false);

  const handleProximaTela = () => {
    setShowCamera(true);
  };

  return (
    <>
      {!showCamera ? (
        <AjudaCadastro handleProximaTela={handleProximaTela} />
      ) : (
        <CameraCadastro
          closeModal={closeModal}
          screenProps={screenProps}
          onError={() => {
            onError && onError();
          }}
          onSuccess={() => {
            onSuccess && onSuccess();
          }}
        />
      )}
    </>
  );
};
