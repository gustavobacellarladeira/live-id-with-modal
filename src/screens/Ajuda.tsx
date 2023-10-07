import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const Ajuda = ({ route, navigation }) => {
  const { id } = route.params;

  //id = 41;
  //console.log("id " + id);

  const handleProximaTela = () => {
    //id = 41;
    navigation.navigate('Camera', { id: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.gifContainer}>
        <Image
          source={require('../../assets/gif_instructions.gif')}
          style={styles.gif}
        />
      </View>
      <Button title="Capturar" onPress={handleProximaTela} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gifContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
    marginBottom: 20,
  },
  gif: {
    width: 350,
    height: '80%',
  },
});

export default Ajuda;
