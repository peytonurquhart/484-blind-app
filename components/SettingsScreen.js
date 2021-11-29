import * as React from 'react';
import { useState } from 'react';
import { Navbar } from './Navbar.js';
import { StyleSheet, SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import { theme } from '../style/theme.js';
import { DropMenu } from './DropMenu.js';
import { MenuSpacer } from './MenuSpacer.js';

export const SettingsScreen = ( {navigation} ) => {

    const MENU_SPACING = 20;

    const genderList = [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
        {
          label: "Others",
          value: "others",
        },
      ];

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <MenuSpacer amount={MENU_SPACING}/>
            <DropMenu label="Gender" values={genderList} onSelect={(sel) => console.log(sel)}/>
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
  