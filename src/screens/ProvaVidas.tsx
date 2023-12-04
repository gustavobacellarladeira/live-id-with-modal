/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
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
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const CameraProvaVidas: React.FC<CameraProvaVidasProps> = ({
  screenProps,
  closeModal: closeScreen,
}) => {
  const id = screenProps?.id;
  const [showCamera, setShowCamera] = useState(true);
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const [intervalState, setIntervalState] = useState<NodeJS.Timeout | null>(
    null
  );

  // Define your state variable for the timer
  const [timer, setTimer] = useState(0);

  const exposure = 0.45;
  const fps = 30;

  const device = devices.back;
  const [load, setLoad] = useState(false);

  let optionsToast = {
    message:
      'Posicione seu dedo na lente da camera ate a tela ficar completamente vermelha, apos isso, clique em verificar',
    visible: true,
  };

  const [stateToast, setStateToast] = useState(optionsToast);
  const [isRecording, setIsRecording] = useState(false);

  const closeModal = () => {
    optionsToast = {
      message: '',
      visible: false,
    };
    setStateToast(optionsToast);
  };

  const [modalCounterVisible] = useState(false);

  useEffect(() => {
    if (timer <= 0) {
      if (!intervalState) return;
      clearInterval(intervalState);
      stopRecodingVideo();
      setLoad(true);
      setIsRecording(false);
    }
  }, [timer, intervalState]);

  const recordingVideo = async () => {
    startVideoRecording();

    setTimer(10); // Reset the timer to 0 when starting the recording

    setIntervalState(
      setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); // Update the timer state
      }, 1000)
    );
  };

  const startVideoRecording = () => {
    setIsRecording(true);

    camera.current?.startRecording({
      flash: 'on',
      // @ts-ignore
      setExposureCompensation: exposure,
      frameProcessorFps: fps,
      onRecordingFinished: (video) => sendFile(video),
      onRecordingError: (error) => console.error(error),
    });
  };

  const stopRecodingVideo = async () => {
    await camera.current?.stopRecording();
    return;
  };

  const sendFile = async (file: VideoFile) => {
    setLoad(true);

    if (!id)
      return Alert.alert(
        'Erro ao enviar o arquivo ( id error ), tente novamente mais tarde'
      );
    let req = await provaVida(file, id, exposure);

    console.log('Prova vidas response -->', JSON.stringify(req, null, 2));
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
    closeScreen();
    return;
  };

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

      <View style={styles.containerCamera}>
        <Camera
          ref={camera}
          style={styles.subContainer}
          isActive={showCamera}
          device={device}
          video={true}
          torch={'on'}
        />
        <View style={styles.cameraView} />
        <View style={styles.containerTouch}>
          <TouchableOpacity
            onPress={() => recordingVideo()}
            disabled={isRecording}
          >
            <View style={styles.containerText}>
              <Text style={styles.textRecording}>
                {isRecording
                  ? `Aguarde ${timer} segundos`
                  : load
                  ? 'Processando...'
                  : 'Verificar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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

  containerCamera: {
    flex: 1,
  },

  cameraView: {
    width: '100%',
    height: RFValue(250),
    backgroundColor: `rgba(173, 216, 230, 0)`,
    position: `absolute`,
    alignSelf: 'center',
    marginTop: RFValue(50),
    alignItems: `center`,
    justifyContent: `center`,
  },

  containerTouch: {
    height: RFValue(180),
    alignItems: 'center',
  },

  containerText: {
    width: RFValue(280),
    height: RFValue(120),
    borderRadius: 150,
    backgroundColor: `blue`,
    alignItems: `center`,
    justifyContent: `center`,
    marginTop: 10,
  },

  textRecording: {
    fontSize: RFValue(18),
    fontWeight: `500`,
    color: `#fff`,
  },
});
