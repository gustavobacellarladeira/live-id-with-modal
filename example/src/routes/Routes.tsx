// In App.js in a new project

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/Login/Login';
import { Dashboard } from '../screens/dashboard/Dashboard';
import { Cadastro } from '../screens/cadastro/Cadastro';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Cadastro">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Cadastro" component={Cadastro} />

      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
    </Stack.Navigator>
  );
};
