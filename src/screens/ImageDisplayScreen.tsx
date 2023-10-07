import React from 'react';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native'; // Importe useIsFocused para controlar o estado quando a tela está em foco

const ImageDisplayScreen = ({ route }) => {
  const { base64Image, id } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Detecta se a tela está em foco

  const goBack = () => {
    navigation.goBack();
  };

  const handleProximaTela = () => {
    navigation.navigate('Ajuda', { id: id });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        {/* Parte gráfica da "Tela 1" */}
        <Image
          source={{ uri: `data:image/jpeg;base64,${base64Image}` }}
          style={styles.image}
        />
        <Text style={styles.imageText}>Para cadastro, qualidade ruim !</Text>

        {/* Parte gráfica da "Tela 2" */}
        <View style={styles.additionalGraphics}>
          <View style={styles.graphicElement1}></View>
          <View style={styles.graphicElement2}></View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Tentar Novamente" onPress={handleProximaTela} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imageContainer: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '90%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  imageText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 150,
    alignItems: 'center',
  },
  additionalGraphics: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: 'transparent', // Ajuste a cor de fundo desejada
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphicElement1: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: 'transparent', // Ajuste o estilo desejado
    borderWidth: 3,
    borderColor: 'yellow',
    marginLeft: 40,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    transform: [{ scaleX: 2 }],
  },
  graphicElement2: {
    // Defina o estilo para o segundo elemento gráfico
  },
});

export default ImageDisplayScreen;
