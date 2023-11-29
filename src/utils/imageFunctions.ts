import RNFS from 'react-native-fs';

export const encodeImageToBase64 = async (imagePath: string) => {
  try {
    const imageData = await RNFS.readFile(imagePath, 'base64');
    return imageData;
  } catch (error) {
    console.log(
      'Erro ao capturar imagens: ' + error + ' - caminho: ' + imagePath
    );
    return null;
  }
};
