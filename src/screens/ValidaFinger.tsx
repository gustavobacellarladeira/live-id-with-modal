/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Loading } from '../components/Loading/Loading';
import { verifyDigital } from '../services';
import RNFS from 'react-native-fs';
import type { ScreenProps } from '../context/modal/interfaces';
import { useModal } from '../context/modal';

interface ValidaFingerProps {
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const ValidaFinger: React.FC<ValidaFingerProps> = ({
  screenProps,
  closeModal,
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
    let UID = id;
    let finger = 'DI';
    let image = capturedImage;
    let req = await verifyDigital(UID, finger, image);

    if (req.code === 0) {
      Alert.alert('Sucesso identificado !');
      setShowCamera(false);
    } else if (req.code === 1) {
      Alert.alert('Não Identificado !');
      setLoad(false);
      setCapturedImage(null);
      openModal({
        type: 'login',
        screenProps: {
          ativarCampoSenha: true,
          fingerErro: true,
        },
      });
    } else {
      Alert.alert('Erro ao tentar validar');
      setLoad(false);
      setCapturedImage(null);
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
    return;
  }, [capturedImage, id, openModal]);

  useEffect(() => {
    if (capturedImage !== null) {
      setLoad(true);
      sendFile();
    } else {
      //console.log('Nenhuma imagem capturada ainda.')
    }
  }, [capturedImage, sendFile]);

  const encodeImageToBase64 = async (imagePath: string) => {
    try {
      const imageData = await RNFS.readFile(imagePath, 'base64');
      return imageData;
    } catch (error) {
      //console.log('Erro ao capturar imagens: ' + error + ' - caminho: ' + imagePath);
      return null;
    }
  };

  // const handlePress = async (event) => {
  //   //console.log(`Coordenadas X: ${event.nativeEvent.locationX}, Coordenadas Y: ${event.nativeEvent.locationY}`);
  // };

  if (device == null) return <View />;

  return (
    <View style={styles.container}>
      <Loading visible={load} />
      {!showCamera ? (
        <View style={styles.containerShowCamera}>
          <Button title="Mostrar Camera" onPress={() => setShowCamera(true)} />
          <Button title="Fechar Tela" onPress={closeModal} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
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
            <Button
              title="Fechar Camera"
              onPress={() => setShowCamera(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: Dimensions.get('window').height * 0.2, // Adjust the percentage as needed
  },

  containerCapture: {
    height: Dimensions.get('window').height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerTitle: {
    width: 350,
    height: 100,
    borderRadius: 80,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },

  containerShowCamera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: `center`,
  },

  containerCameraView: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: `rgba(173, 216, 230, 0)`,
    position: `absolute`,
    alignSelf: 'center',
    marginTop: '35%',
    alignItems: `center`,
    justifyContent: `center`,
  },

  cameraView: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'yellow',
    marginLeft: 40,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    transform: [{ scaleX: 2 }],
  },
});
