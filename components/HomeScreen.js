import * as React from 'react';
import { Navbar } from './Navbar.js';
import { Button } from 'react-native-paper';
import { theme } from '../style/theme.js';
import * as Route from '../Routes.js';
import { StyleSheet, Text, View } from 'react-native';
export const HomeScreen = ( {navigation} ) => {
    // on settings click
    const settingsOnPress = () => {
        navigation.navigate(Route.SETTINGS_SCREEN);
    }
    // on navigation click
    const navigationOnPress = () => {
        navigation.navigate(Route.NAVIGATE_SCREEN)
    }
    // on emergency click
    const emergencyOnPress = () => {
        navigation.navigate(Route.EMERGENCY_SCREEN);
    }
    // get component which is a child of button with 'text'
    const buttonChild = (text) => {
        return (
            <Text>{text}</Text>
        )
    }
    return (
        <View style={styles.container}>
            <Button mode="contained" onPress={settingsOnPress} style={styles.settingsButton} children={buttonChild("Settings")} contentStyle={styles.buttonContent}/>
            <Button mode="contained" onPress={navigationOnPress} style={styles.navButton} children={buttonChild("Navigation")} contentStyle={styles.buttonContent}/>
            <Button mode="contained" onPress={emergencyOnPress} style={styles.emergencyButton} children={buttonChild("Emergency")} contentStyle={styles.buttonContent}/>
            <Navbar navigation={navigation}/>
        </View>
    )
};
// styles for home screen child components
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navButton: {
        backgroundColor: theme.colors.accent,
        width: '80%',
        height: '40%',
        marginTop: '10%',
        marginBottom: '10%',
    },
    emergencyButton: {
        backgroundColor: theme.colors.accent,
        width: '80%',
        height: '12%',
    },
    settingsButton: {
        backgroundColor: theme.colors.accent,
        width: '80%',
        height: '12%',
    },
    buttonContent: {
        height: '100%',
        width: '100%',
    },
});