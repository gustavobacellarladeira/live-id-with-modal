import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from './styles.js'

export const Toast = ({ isVisible, message, onClose }) => {
  return (
    <Modal transparent visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalCard}>
          <Text style={styles.messageText}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};