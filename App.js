import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './components/HomeScreen.js';
import { SettingsScreen } from './components/SettingsScreen.js';
import { theme } from './style/theme.js';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

// ICONS: https://icons.expo.fyi/

const Stack = createNativeStackNavigator();

const navigatorOptions = {
   headerShown: false,
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
    <StatusBar style="auto" />

      <Stack.Navigator screenOptions={navigatorOptions}>
       <Stack.Screen name="Home" component={HomeScreen}/>
       <Stack.Screen name="Settings" component={SettingsScreen}/>
      </Stack.Navigator>

    </NavigationContainer>
    </PaperProvider>
    
  );
}