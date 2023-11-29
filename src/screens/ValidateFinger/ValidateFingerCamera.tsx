import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Loading } from '../../components/Loading/Loading';
import { verifyDigital } from '../../services';
import type { ScreenProps } from '../../context/modal/interfaces';
import { useModal } from '../../context/modal';
import { styles } from './styles';
import { encodeImageToBase64 } from '../../utils/imageFunctions';

interface ValidateFingerCameraProps {
  closeModal: () => void;
  onError?: (response?: any) => void;
  onSuccess?: (response?: any) => void;
  screenProps?: ScreenProps;
}

export const ValidateFingerCamera: React.FC<ValidateFingerCameraProps> = ({
  screenProps,
  closeModal,
  onError,
  onSuccess,
}) => {
  const id = screenProps?.id;
  const { openModal } = useModal();
  const [showCamera, setShowCamera] = useState(true);
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const [capturedImage, setCapturedImage] = useState<any>(null);

  const [load, setLoad] = useState(false);

  const capturedPhoto = async () => {
    const snapshot = await camera.current?.takeSnapshot({
      quality: 100,
      skipMetadata: true,
    });

    if (snapshot == null) {
      Alert.alert('Erro ao capturar imagem');
      return false;
    }
    let base64 = await encodeImageToBase64(snapshot.path);
    setCapturedImage(base64);
    return true;
  };

  const sendFile = useCallback(async () => {
    try {
      let UID = id;
      let finger = 'DI';
      let image = capturedImage;
      let response = await verifyDigital(UID, finger, image);

      if (response.code === 0) {
        Alert.alert('Sucesso identificado !');
        onSuccess && onSuccess(response);

        setShowCamera(false);
      } else if (response.code === 1) {
        Alert.alert('Não Identificado !');

        onError &&
          onError({
            response: response,
            message: 'Não Identificado !',
          });

        openModal({
          type: 'login',
          screenProps: {
            ativarCampoSenha: true,
            fingerErro: true,
          },
        });
      } else {
        Alert.alert('Erro ao tentar validar');
        onError &&
          onError({
            response: response,
            message: 'Erro ao tentar validar',
          });
        openModal({
          type: 'login',
          screenProps: {
            ativarCampoSenha: true,
            fingerErro: true,
          },
        });
      }

      setLoad(false);
      setCapturedImage(null);
      closeModal();

      return;
    } catch (error) {
      onError && onError(error);
    }
  }, [capturedImage, id, onError, onSuccess, openModal, closeModal]);

  useEffect(() => {
    if (capturedImage !== null) {
      setLoad(true);
      sendFile();
    } else {
      console.log('Nenhuma imagem capturada ainda.');
    }
  }, [capturedImage, sendFile]);

  if (device == null) return <View />;

  return (
    <View style={styles.container}>
      <Loading visible={load} />

      <View style={styles.container}>
        <Camera
          ref={camera}
          style={styles.subContainer}
          isActive={showCamera}
          device={device}
          torch={'on'}
          // @ts-ignore
          exposure={0.4}
          zoom={3}
          photo={true}
          enableHighQualityPhotos={true}
        />
        <View style={styles.containerCameraView}>
          <View style={styles.cameraView} />
        </View>
        <View style={styles.containerCapture}>
          <TouchableOpacity onPress={() => capturedPhoto()}>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>Tirar Foto</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Button title="Fechar Camera" onPress={closeModal} />
        </View>
      </View>
    </View>
  );
};
