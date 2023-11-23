import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";

interface CounterModalProps {
  isVisible: boolean;
  onFinish: () => void;
}

export const CounterModal: React.FC<CounterModalProps> = ({
  isVisible,
  onFinish,
}) => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (isVisible) {
      startCountdown();
    }
  }, [isVisible]);

  const startCountdown = () => {
    setCounter(5);

    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      onFinish();
    }, 10000);
  };

  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.counterText}>{counter}</Text>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
  counterText: {
    fontSize: 48,
    textAlign: "center",
  },
});
