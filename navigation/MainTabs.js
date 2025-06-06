import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MeusRolesScreen from '../screens/MeusRolesScreen';
import MeusInteressesScreen from '../screens/MeusInteressesScreen';
import MeuPerfilScreen from '../screens/MeuPerfilScreen';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: insets.bottom + (Platform.OS === 'android' ? 12 : 20), 
          height: insets.bottom + (Platform.OS === 'android' ? 60 : 80),
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: '#fff',
          elevation: 10,
        },
        tabBarActiveTintColor: '#7D4EF3',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Pesquisa"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meus Rolês"
        component={MeusRolesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meus Interesses"
        component={MeusInteressesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meu Perfil"
        component={MeuPerfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
