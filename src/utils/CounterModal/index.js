import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { styles } from './styles'

export const CounterModal = ({ isVisible, onFinish }) => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (isVisible) {
      startCountdown();
    }
  }, [isVisible]);

  const startCountdown = () => {
    setCounter(5);

    const intervalId = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      onFinish();
    }, 5000);
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

