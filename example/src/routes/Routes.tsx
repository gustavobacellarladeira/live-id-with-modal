// In App.js in a new project

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';

import { StacksLiveID } from 'react-native-live-id-sdk';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="LiveID" component={() => StacksLiveID(Stack)} /> */}
      <Stack.Screen name="LiveID">
        {() => StacksLiveID(Stack, navigation)}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
