import * as React from 'react';
import { Navbar } from './Navbar.js';
import { StyleSheet, Text, View } from 'react-native';

export const HomeScreen = ( {navigation} ) => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Navbar navigation={navigation}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
});