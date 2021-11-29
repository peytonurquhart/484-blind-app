import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// ICONS: https://icons.expo.fyi/

export const Navbar = ( {navigation} ) => {
  return (
    <Appbar style={styles.bottom}>

      <Appbar.Action 
        onPress={() => navigation.navigate("Home")} 
        icon={({ size, color }) => ( <AntDesign name="home" size={size} color={color}/>)}/> 

      <Appbar.Action 
        onPress={() => navigation.navigate("Settings")}
        icon={({ size, color }) => ( <AntDesign name="setting" size={size} color={color}/>)}/> 

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