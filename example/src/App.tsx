import React from 'react';
import { Routes } from './routes/Routes';
import { NavigationContainer } from '@react-navigation/native';

import { ModalProvider } from 'react-native-live-id-sdk';

export default function App() {
  return (
    <NavigationContainer>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </NavigationContainer>
  );
}
