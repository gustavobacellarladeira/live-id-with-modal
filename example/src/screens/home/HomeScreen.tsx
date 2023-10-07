import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { useModal } from 'react-native-live-id-sdk';

export const HomeScreen = () => {
  const screens = useNavigationState((state) => state.routes);
  const { openModal } = useModal();
  console.log(screens);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          openModal({
            type: 'screen1',
          });
        }}
      >
        <Text>OPEN MODAL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
