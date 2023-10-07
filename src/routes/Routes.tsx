import React from 'react';
import { TestScreeen } from '../screens/TestScreeen';
import { CadastroScreen } from 'react-native-live-id-sdk';

export const StacksLiveID = (Stack: any, navigation: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TestScreeen" component={TestScreeen} />
      <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
    </Stack.Navigator>
  );
};
