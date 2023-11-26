import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import type { ScreenProps } from '../context/modal/interfaces';
import { useModal } from '../context/modal';

interface AjudaProps {
  navigation?: any;
  closeModal: () => void;
  screenProps?: ScreenProps;
}

export const Ajuda: React.FC<AjudaProps> = ({ screenProps }) => {
  const { openModal } = useModal();
  const id = screenProps?.id;

  const handleProximaTela = () => {
    //id = 41;

    openModal({
      type: 'mainCamera',
      screenProps: {
        id: id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.gifContainer}>
        <Image
          source={require('../assets/gif_instructions.gif')}
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
