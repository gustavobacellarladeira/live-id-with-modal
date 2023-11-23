import React from "react";
import { View, Modal, ActivityIndicator } from "react-native";

interface LoadingProps {
  visible: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ visible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"blue"}></ActivityIndicator>
      </View>
    </Modal>
  );
};
