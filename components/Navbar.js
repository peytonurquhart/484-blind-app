import * as React from 'react';
import { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Route from '../Routes.js';
import { DeviceMotion } from 'expo-sensors';
import { sleep } from '../util/sleep.js';
import * as MotionEvent from '../util/MotionListner.js';

// Navbar is responsible for global app navigation, so it may also navigate on Motion Events in addition to clicks
const UPDATE_INTERVAL_MS = 1000;
const shakeEventListner = new MotionEvent.MotionListener(10, UPDATE_INTERVAL_MS, 1);
const dropEventListner = new MotionEvent.MotionListener(7, UPDATE_INTERVAL_MS, 4);

DeviceMotion.isAvailableAsync().then(() => { setMotionListner() }, () => console.log("Warning: Device motion sensors not avaialble!"));
DeviceMotion.setUpdateInterval(UPDATE_INTERVAL_MS);
const setMotionListner = () => {
  console.log("Success: Device motion sensors available.");
  DeviceMotion.addListener(shakeEventListner.listner);
  DeviceMotion.addListener(dropEventListner.listner);
}

// ICONS: https://icons.expo.fyi/

export const Navbar = ( {navigation} ) => {

  const onShakeListnerUpdate = (status) => {
    if (status == MotionEvent.EVENT_ACTIVE) {
      navigation.navigate(Route.VOICE_COMMMAND);
    }
  }
  const onDropEventListnerUpdate = (status) => {
    if (status == MotionEvent.EVENT_ACTIVE) {
      navigation.navigate(Route.EMERGENCY_SCREEN);
    }
  }
  useEffect(() => {
      shakeEventListner.unsubscribe();
      dropEventListner.unsubscribe();
      async function s(ms){
        // wait to subscribe to shake listner, just in case they dropped their phone
        // we dont want to immediately detect a shake
        await (sleep(ms));
        shakeEventListner.subscribe(onShakeListnerUpdate);
      }
      dropEventListner.subscribe(onDropEventListnerUpdate);
      s(5000);
  })
  return (
    <Appbar style={styles.bottom}>

      <Appbar.Action 
        onPress={() => navigation.navigate(Route.HOME_SCREEN)} 
        icon={({ size, color }) => ( <AntDesign name="home" size={size} color={color}/>)}/> 

      <Appbar.Action 
        onPress={() => navigation.navigate(Route.NAVIGATE_SCREEN)}
        icon={({ size, color }) => ( <Ionicons name="navigate-outline" size={size} color={color}/>)}/> 

    <Appbar.Action 
        onPress={() => navigation.navigate(Route.VOICE_COMMMAND)}
        icon={({ size, color }) => ( <MaterialIcons name="record-voice-over" size={size} color={color} />)}/> 

      <Appbar.Action 
        onPress={() => navigation.navigate(Route.SETTINGS_SCREEN)}
        icon={({ size, color }) => ( <AntDesign name="setting" size={size} color={color}/>)}/> 

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