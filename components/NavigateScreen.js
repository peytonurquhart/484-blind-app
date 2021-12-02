import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../style/theme.js';
import { Card } from 'react-native-paper';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { Navbar } from './Navbar.js';
import { sleep } from '../util/sleep.js';
import * as LocListner from '../util/LocationListner.js';
import { useFocusEffect } from '@react-navigation/native';

const UPDATE_INTERVAL_MS = 500;

Location.requestForegroundPermissionsAsync().then(
    () => console.log("Success: Location permissions enabled!"), 
    () => console.log("Warning: Location permission denied!") 
);
const locationEventListner = new LocListner.LocationListener(
    Location.getCurrentPositionAsync,
    { accuracy: Location.Accuracy.Highest },
    UPDATE_INTERVAL_MS,
);

export const NavigateScreen = ({ navigation }) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [locPermission, setLocPermission] = useState(true);
    const [location, setLocation] = useState(null);
    const [updatedLoc, setUpdatedLoc] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const onLocationUpdateEvent = (data) => {
        setLocation(data.data);
        setUpdatedLoc(true);
    }
    useEffect(() => {
        if(!subscribed) {
            locationEventListner.subscribe(onLocationUpdateEvent);
            setSubscribed(true);
            console.log("subbed");
        }
    })
    useEffect(() => {
        let isMounted = true;
        Camera.requestCameraPermissionsAsync().then((status) => {
        if(isMounted) {
            setCameraPermission(status.status==='granted');
        }});
        return () => { isMounted = false };
    });
    useEffect(() => {
        let isMounted = true;
        if(updatedLoc) {
            async function resetAsync(ms) {
                await sleep(ms);
                if(isMounted) {
                    setUpdatedLoc(false);
                }
            }
            resetAsync(70);
        }
        return () => { isMounted = false };
    }, [updatedLoc])

    const parseLocation = (loc) => {
        if(!loc.coords) { return "No Data"; }
        let coords = loc.coords;
        let s = "ALT: " + coords.altitude.toString().substring(0, 12);
        s += "\nLAT: " + coords.latitude.toString().substring(0, 12);
        s += "\nLON: " + coords.longitude.toString().substring(0, 12);
        s += "\nAccuracy: " + coords.accuracy.toString().substring(0, 5);
        return s;
    }
    let text = 'Waiting for Location...';
    if (!locPermission) {
        text = 'You must Enable Location Permission in Device Settings!';
    } else if (location) {
        text = parseLocation(location);
    }
    return (
        cameraPermission ?
        <View style={styles.container}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back}>
            <Card style={updatedLoc? {...styles.card, backgroundColor: 'rgba(0,128,0,0.5)'} : styles.card}>
            <Card.Content style={styles.content}>
                <Text style={styles.cardContent}>{text}</Text>
            </Card.Content>
            </Card>
            </Camera>
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
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingTop: '120%',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '80%',
        height: '30%',
        marginTop: '10%',
        marginBottom: '10%',
    },
    content: {
        paddingVertical: '5%',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    cardContent: {
        flex: 1,
        textAlign: 'center',
        fontFamily: theme.fonts.medium.fontFamily,
        fontWeight: 'bold',
    },
});