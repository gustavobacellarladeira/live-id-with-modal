import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={color}></ActivityIndicator>
      </View>
    </Modal>
  );
};
