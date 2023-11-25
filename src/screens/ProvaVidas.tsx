/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  Camera,
  useCameraDevices,
  type VideoFile,
} from 'react-native-vision-camera';

import { Loading } from '../components/Loading/Loading';
import { Toast } from '../components/Toast/Toast';
import { CounterModal } from '../components/CounterModal/CounterModal';

import { provaVida } from '../services';

import { RFValue } from 'react-native-responsive-fontsize';
import type { ScreenProps } from '../context/modal/interfaces';
import { Alert } from 'react-native';

interface CameraProvaVidasProps {
  navigation?: any;
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const CameraProvaVidas: React.FC<CameraProvaVidasProps> = ({
  screenProps,
}) => {
  const cpf = screenProps?.cpf;
  const id = screenProps?.id;

  //let id = 41;

  //console.log("id " + id);
  //console.log("cpf " + cpf);

  // const newCameraPermission = Camera.requestCameraPermission();

  const [showCamera, setShowCamera] = useState(true);
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();

  const exposure = 0.45;
  const fps = 30;

  // const [desativaBotao, setDesativaBotao] = useState(false);

  const device = devices.back;
  const [load, setLoad] = useState(false);

  let optionsToast = {
    message:
      'Posicione seu dedo na lente da camera ate a tela ficar completamente vermelha, apos isso, clique em verificar',
    visible: true,
  };

  const [stateToast, setStateToast] = useState(optionsToast);
  const [isRecording, setIsRecording] = useState(false);
  const isCPFValido = cpf !== '';
  const isIDValido = id !== '' && typeof id === 'number';

  //console.log("isCPFValido " + isCPFValido);
  //console.log("isIDValido " + isIDValido);

  const closeModal = () => {
    optionsToast = {
      message: '',
      visible: false,
    };
    setStateToast(optionsToast);
  };

  const [modalCounterVisible, setModalCounterVisible] = useState(false);

  // function openCounter() {
  //   setLoad(true);
  //   setIsRecording(true);
  // }

  // function closeCounter() {
  //   setModalCounterVisible(false);
  // }

  const recordingVideo = async () => {
    camera.current?.startRecording({
      flash: 'on',
      // @ts-ignore
      setExposureCompensation: exposure,
      frameProcessorFps: fps,
      onRecordingFinished: (video) => sendFile(video),
      onRecordingError: (error) => console.error(error),
    });
    setTimeout(() => {
      stopRecodingVideo();
      setIsRecording(false);
    }, 10000);
  };

  const stopRecodingVideo = async () => {
    await camera.current?.stopRecording();
    return;
  };

  const sendFile = async (file: VideoFile) => {
    setLoad(true);
    let req = await provaVida(file, id, exposure);
    //console.log(req.code)
    if (req.code === 0 && req.bpm >= 0) {
      optionsToast = {
        message: `Seu batimento esta em: ${req.bpm}.\n Prova de vida concluida !`,
        visible: true,
      };
      setStateToast(optionsToast);
      setShowCamera(false);
    } else {
      Alert.alert(req.message);
    }
    setLoad(false);
    //setDesativaBotao(false)

    return;
  };

  // const handlePress = async (event) => {
  //   //console.log(`Coordenadas X: ${event.nativeEvent.locationX}, Coordenadas Y: ${event.nativeEvent.locationY}`);
  // };

  if (device == null) return <View />;

  return (
    <View style={styles.container}>
      <Toast
        message={stateToast.message}
        isVisible={stateToast.visible}
        onClose={() => closeModal()}
      />
      <CounterModal
        isVisible={modalCounterVisible}
        onFinish={() => console.log}
      />
      <Loading visible={load} />
      {!showCamera ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: `center` }}
        >
          <Button title="Mostrar Camera" onPress={() => setShowCamera(true)} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            ref={camera}
            style={styles.subContainer}
            isActive={showCamera}
            device={device}
            video={true}
            torch={'on'}
          />
          <View
            style={{
              width: '100%',
              height: RFValue(250),
              backgroundColor: `rgba(173, 216, 230, 0)`,
              position: `absolute`,
              alignSelf: 'center',
              marginTop: RFValue(50),
              alignItems: `center`,
              justifyContent: `center`,
            }}
          ></View>
          <View style={{ height: RFValue(180), alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => recordingVideo()}
              disabled={isRecording}
            >
              <View
                style={{
                  width: RFValue(280),
                  height: RFValue(120),
                  borderRadius: 150,
                  backgroundColor: `blue`,
                  alignItems: `center`,
                  justifyContent: `center`,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(18),
                    fontWeight: `500`,
                    color: `#fff`,
                  }}
                >
                  {isRecording ? 'Salvando...' : 'Verificar'}
                </Text>
              </View>
            </TouchableOpacity>
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
  },
  image: {
    width: RFValue(200),
    height: RFValue(200),
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});
