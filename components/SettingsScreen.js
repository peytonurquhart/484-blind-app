import * as React from 'react';
import { useState } from 'react';
import { Navbar } from './Navbar.js';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Text} from 'react-native';
import { theme } from '../style/theme.js';
import { DropMenu } from './DropMenu.js';
import { MenuSpacer } from './MenuSpacer.js';
import { MenuSlider } from './MenuSlider.js';
import { Slider } from '@miblanchard/react-native-slider';

export const SettingsScreen = ( {navigation} ) => {

    const MENU_SPACING = 20;

    const notificationTypes = [
        {
          label: "Vibration 1",
          value: "vibraton-1",
        },
        {
          label: "Vibration 2",
          value: "vibration-2",
        },
        {
          label: "Vibration 3",
          value: "vibration-3",
        },
        {
            label: "Vibration 4",
            value: "vibration-4",
          },
      ];

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <MenuSpacer amount={MENU_SPACING*2}/>

            <Text> Vibration Intensity </Text>
            <MenuSlider min={1} max={5} defaultValue={null} onChange={(value) => console.log(value)}/>
            <MenuSpacer amount={MENU_SPACING}/>     

            <Text> Staircase Vibration </Text>
            <DropMenu label="Select" values={notificationTypes} defaultValue={null} onSelect={(sel) => console.log(sel)}/>
            <MenuSpacer amount={MENU_SPACING}/>

            <Text> Open Door Vibration </Text>
            <DropMenu label="Select" values={notificationTypes} defaultValue={null} onSelect={(sel) => console.log(sel)}/>
            <MenuSpacer amount={MENU_SPACING}/>

            <Text> Closed Door Vibration </Text>
            <DropMenu label="Select" values={notificationTypes} defaultValue={null} onSelect={(sel) => console.log(sel)}/>
            <MenuSpacer amount={MENU_SPACING}/>

            <Text> Moving Object in Proximity Vibration </Text>
            <DropMenu label="Select" values={notificationTypes} defaultValue={null} onSelect={(sel) => console.log(sel)}/>
            <MenuSpacer amount={MENU_SPACING}/>

        </ScrollView>
        <Navbar navigation={navigation} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: theme.colors.accent,
    },
    scrollView: {
      backgroundColor: 'rgba(52, 52, 52, 0.4)',
      marginHorizontal: 20,
      paddingHorizontal: 20,
    },
  });
  