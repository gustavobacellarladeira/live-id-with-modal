import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingProps {
  visible: boolean;
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  visible,
  color = 'blue',
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color={color} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
