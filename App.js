import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { EventosProvider } from './Context/EventosContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <EventosProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </EventosProvider>
    </SafeAreaProvider>
  );
}
