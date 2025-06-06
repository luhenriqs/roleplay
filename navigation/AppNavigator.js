import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabs from './MainTabs'; 
import DetalhesScreen from '../screens/DetalhesScreen';
import CadastrarRoleScreen from '../screens/CadastrarRoleScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={MainTabs} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      <Stack.Screen name="CadastrarRole" component={CadastrarRoleScreen} />
    </Stack.Navigator>
  );
}
