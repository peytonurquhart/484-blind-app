import React from 'react';
import { theme } from './style/theme.js';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './components/HomeScreen.js';
import { NavigateScreen } from './components/NavigateScreen.js';
import EmergencyScreen from './components/EmergencyScreen.js';
import VoiceCommandScreen from './components/VoiceCommandScreen.js';
import SettingsScreen from './components/SettingsScreen.js';
import * as Route from './Routes.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as StateProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { store } from './redux/store.js';

// ICONS: https://icons.expo.fyi/

// redux store debug updates \/
// store.subscribe(() => console.log(store.getState()));

const Stack = createNativeStackNavigator();

const navigatorOptions = {
   headerShown: false,
}

export default function App() {

  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
    <StatusBar style="auto" />
    <StateProvider store={store}>
      <Stack.Navigator screenOptions={navigatorOptions}>
       <Stack.Screen name={Route.HOME_SCREEN} component={HomeScreen}/>
       <Stack.Screen name={Route.SETTINGS_SCREEN} component={SettingsScreen}/>
       <Stack.Screen name={Route.NAVIGATE_SCREEN} component={NavigateScreen}/>
       <Stack.Screen name={Route.EMERGENCY_SCREEN} component={EmergencyScreen}/>
       <Stack.Screen name={Route.VOICE_COMMMAND} component={VoiceCommandScreen}/>
      </Stack.Navigator>
    </StateProvider>
    </NavigationContainer>
    </PaperProvider>
    
  );
}