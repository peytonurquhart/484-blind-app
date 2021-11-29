import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './components/HomeScreen.js';
import { SettingsScreen } from './components/SettingsScreen.js';
import { NavigateScreen } from './components/NavigateScreen.js';
import { EmergencyScreen } from './components/EmergencyScreen.js';
import * as Route from './Routes.js';
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
       <Stack.Screen name={Route.HOME_SCREEN} component={HomeScreen}/>
       <Stack.Screen name={Route.SETTINGS_SCREEN} component={SettingsScreen}/>
       <Stack.Screen name={Route.NAVIGATE_SCREEN} component={NavigateScreen}/>
       <Stack.Screen name={Route.EMERGENCY_SCREEN} component={EmergencyScreen}/>
      </Stack.Navigator>

    </NavigationContainer>
    </PaperProvider>
    
  );
}