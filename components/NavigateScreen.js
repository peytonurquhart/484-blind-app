import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Navbar } from './Navbar.js';

export const NavigateScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    useEffect(() => {
        Camera.requestCameraPermissionsAsync().then((status) => {
            setHasPermission(status.status==='granted');
        });
    });
    return (
        hasPermission ?
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}/>
            <Navbar navigation={navigation} />
        </View>
        : <View/>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
    }
});