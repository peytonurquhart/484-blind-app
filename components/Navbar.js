import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Route from '../Routes.js';

// ICONS: https://icons.expo.fyi/

export const Navbar = ( {navigation} ) => {
  return (
    <Appbar style={styles.bottom}>

      <Appbar.Action 
        onPress={() => navigation.navigate(Route.HOME_SCREEN)} 
        icon={({ size, color }) => ( <AntDesign name="home" size={size} color={color}/>)}/> 

      <Appbar.Action 
        onPress={() => navigation.navigate(Route.SETTINGS_SCREEN)}
        icon={({ size, color }) => ( <AntDesign name="setting" size={size} color={color}/>)}/> 

      <Appbar.Action 
        onPress={() => navigation.navigate(Route.NAVIGATE_SCREEN)}
        icon={({ size, color }) => ( <Ionicons name="navigate-outline" size={size} color={color}/>)}/> 

      <Appbar.Action 
        onPress={() => navigation.navigate(Route.EMERGENCY_SCREEN)}
        icon={({ size, color }) => ( <Ionicons name="md-warning-outline" size={size} color={color}/>)}/> 

    </Appbar>
  )
};

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});