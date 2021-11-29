import { StatusBar } from 'expo-status-bar';
import { Navbar } from './components/Navbar.js';
import { theme } from './style/theme.js';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Navbar/>
        <Text>App.js</Text>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
