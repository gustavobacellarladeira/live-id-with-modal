/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  CameraRoll,
  FileSystem,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

import Loading from '../utils/Loading';
import { sendImages } from '../services';
import RNFS from 'react-native-fs';

//import RNFetchBlob from 'rn-fetch-blob';
//import { labelImage } from "vision-camera-image-labeler";

// import 'react-native-reanimated';

let vezesQualidadeDigitalCount = 0;

function MainCamera({ route, navigation }) {
  const { id } = route.params;

  //id = 41;

  console.log('id ' + id);

  console.log('vezesQualidadeDigitalCount ' + vezesQualidadeDigitalCount);

  const newCameraPermission = Camera.requestCameraPermission();

  const [showCamera, setShowCamera] = useState(true);
  const camera = useRef(Camera);
  const devices = useCameraDevices();
  const device = devices.back;

  const [arrayImages, setArrayImages] = useState<any[]>([]);

  const [load, setLoad] = useState(false);

  const [fingerErro, setFingerErro] = useState(false);

  const capturedPhoto = async () => {
    // const focus = await camera.current.focus({ x: 7, y: 6})

    const snapshot = await camera.current.takeSnapshot({
      quality: 100,
      skipMetadata: true,
    });

    const snapshot2 = await camera.current.takeSnapshot({
      quality: 100,
      skipMetadata: true,
    });

    const snapshot3 = await camera.current.takeSnapshot({
      quality: 100,
      skipMetadata: true,
    });

    let base64 = await encodeImageToBase64(snapshot.path);
    let base642 = await encodeImageToBase64(snapshot2.path);
    let base643 = await encodeImageToBase64(snapshot3.path);

    //const path = './base64.txt';

    setArrayImages((prevArray) => [...prevArray, base64, base642, base643]);
    return true;
  };

  function validarBase64(array: string | any[]) {
    // Verifica se o argumento é um array e tem exatamente 3 elementos
    if (!Array.isArray(array) || array.length !== 3) {
      //console.log("Nao eh array")
      return false;
    }

    // Regex para validar base64
    const base64Regex = /^[a-zA-Z0-9+/]*={0,2}$/;

    // Verifica se cada elemento do array é uma string válida em base64
    for (let i = 0; i < array.length; i++) {
      if (typeof array[i] !== 'string' || !base64Regex.test(array[i])) {
        //console.log("base64 nao esta valido")
        return false;
      }
    }

    // Se chegou até aqui, o array é válido
    return true;
  }

  const sendFile = useCallback(async () => {
    let UID = id;
    let finger = 'DI';
    let images = arrayImages;

    if (validarBase64(images) === false) {
      return false;
    }
    let req = await sendImages(UID, finger, images);
    //console.log(req)
    if (req.code === 0) {
      Alert.alert('Sucesso !');
      setLoad(false);
      setArrayImages([]);
      navigation.navigate('Login');
    } else if (req.code === 1) {
      Alert.alert('Já cadastrada !');
    } else {
      //alert("Erro, por favor, verifique e tente novamente !")
      setLoad(false);
      setArrayImages([]);
      vezesQualidadeDigitalCount += 1; // Incrementa a contagem
      //console.log('Quantidade de prevCount: ', vezesQualidadeDigitalCount)
      if (arrayImages.length > 0) {
        const firstBase64 = arrayImages[0]; // Pega o primeiro elemento do array
        //console.log("ver " + firstBase64)
        navigation.navigate('QualidadeDigital', {
          base64Image: firstBase64,
          id: id,
        }); // Envia apenas a primeira base64
      }
    }
    setLoad(false);
    setArrayImages([]);
    return;
  }, [arrayImages, id, navigation]);

  useEffect(() => {
    if (arrayImages.length === 3) {
      setLoad(true);
      sendFile();
    } else {
      //console.log('Quantidade de items: ', arrayImages.length)
    }

    if (vezesQualidadeDigitalCount >= 3) {
      setFingerErro(true); // Define fingerErro como true após 2 acessos
      vezesQualidadeDigitalCount = 0;
      navigation.navigate('Login', {
        ativarCampoSenha: true,
        fingerErro: true,
      });
    }
  }, [arrayImages, navigation, sendFile]);

  const encodeImageToBase64 = async (imagePath: any) => {
    try {
      const imageData = await RNFS.readFile(imagePath, 'base64');
      return imageData;
    } catch (error) {
      //console.log('Erro ao capturar imagens: ' + error + ' - caminho: ' + imagePath);
      return null;
    }
  };

  const frameProcessor = useFrameProcessor((frame: any) => {
    // 'worklet';
    // const labels = labelImage(frame);
    // console.log(labels)
  }, []);

  const handlePress = async (event: any) => {
    //console.log(`Coordenadas X: ${event.nativeEvent.locationX}, Coordenadas Y: ${event.nativeEvent.locationY}`);
  };

  useEffect(() => {
    if (fingerErro) {
      // Se houver um erro na captura, retorne para a tela de Login com a variável fingerErro
      navigation.navigate('Login', { fingerErro: true });
    }
  }, [fingerErro, navigation]);

  const handleRetornar = () => {
    // Função para lidar com o retorno para a tela de Login
    setFingerErro(false); // Reseta a variável fingerErro
    navigation.navigate('Login', { ativarCampoSenha: true }); // Define ativarCampoSenha como true
  };

  if (device == null) return <View />;
  return (
    <View style={styles.container}>
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
            // preset='photo'
            // quality={1}
            torch={'on'}
            frameProcessor={frameProcessor}
            exposure={0.4}
            zoom={3}
            photo={true}
            enableHighQualityPhotos={true}
          ></Camera>
          <View
            style={{
              width: '100%',
              height: Dimensions.get('window').height * 0.4,
              backgroundColor: `rgba(173, 216, 230, 0)`,
              position: `absolute`,
              alignSelf: 'center',
              marginTop: '35%',
              alignItems: `center`,
              justifyContent: `center`,
            }}
          >
            <View
              style={{
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
              }}
            />
          </View>
          <View
            style={{
              height: Dimensions.get('window').height * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity onPress={() => capturedPhoto()}>
              <View
                style={{
                  width: 350,
                  height: 100,
                  borderRadius: 80,
                  backgroundColor: 'blue',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '500', color: '#fff' }}
                >
                  Tirar Foto
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Dimensions.get('window').height * 0.2, // Adjust the percentage as needed
  },
});

export default MainCamera;
