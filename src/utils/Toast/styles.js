import {StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 8,
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});