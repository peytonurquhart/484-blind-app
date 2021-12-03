import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../style/theme.js';
import { Card } from 'react-native-paper';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import { Camera } from 'expo-camera';
import { Navbar } from './Navbar.js';
import { sleep } from '../util/sleep.js';
import * as Loc from '../util/LocationListener.js';
import * as Compass from '../util/CompassListener.js';

const UPDATE_INTERVAL_MS = 900;
const COMPASS_UPDATE_INTERVAL_MS = 50;
const FEET_PER_METER = 3.280839895;

Location.requestForegroundPermissionsAsync().then(
    () => console.log("Success: Location permissions enabled!"), 
    () => console.log("Warning: Location permission denied!") 
);
const locationEventListner = new Loc.LocationListener(
    Location.getCurrentPositionAsync,
    { accuracy: Location.Accuracy.Highest },
    UPDATE_INTERVAL_MS,
);
const compassEventListner = new Compass.CompassListener();
Magnetometer.isAvailableAsync().then(
    () => setCompassListner(),
    () => console.log("Warning: Magnetometer sensor not avaialble!")
);
Magnetometer.setUpdateInterval(COMPASS_UPDATE_INTERVAL_MS);
const setCompassListner = () => {
    console.log("Success: Magnetometer available.");
    Magnetometer.removeAllListeners();
    Magnetometer.addListener(compassEventListner.listener);
}
const parseLocation = (loc, heading) => {
    if(!loc||!loc.coords) { return "Waiting for data..."; }
    let coords = loc.coords;
    let s = "HEADING: " + heading;
    s += "\nALT:   " + (coords.altitude*FEET_PER_METER).toString().substring(0, 12) + " ft";
    s += "\nLAT:   " + coords.latitude.toString().substring(0, 12) + " deg";
    s += "\nLON:   " + coords.longitude.toString().substring(0, 12) + " deg";
    s += "\nAccuracy:   " + (coords.accuracy*FEET_PER_METER).toString().substring(0, 5) + " ft";
    return s;
}
const NavigateChild = (props) => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [updatedLoc, setUpdatedLoc] = useState(false);
    useEffect(() => {
        let isMounted = true;
        Camera.requestCameraPermissionsAsync().then((status) => {
        if(isMounted) {
            setCameraPermission(status.status==='granted');
        }});
        return () => { isMounted = false };
    });
    useEffect(() => {
        if(props.location) {
            setUpdatedLoc(true);
        }
    }, [props.location]);
    useEffect(() => {
        let isMounted = true;
        if(updatedLoc) {
        async function resetAsync(ms) {
            await sleep(ms);
            if(isMounted) { setUpdatedLoc(false); }
        }
        resetAsync(150);
    }
        return () => { isMounted = false };
    }, [updatedLoc])
    return (
        cameraPermission ?
        <View style={styles.container}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back}>
            <Card style={updatedLoc? {...styles.card, backgroundColor: 'rgba(0,128,0,0.5)'} : styles.card}>
            <Card.Content style={styles.content}>
                <Text style={styles.cardContent}>{parseLocation(props.location, props.heading)}</Text>
            </Card.Content>
            </Card>
            </Camera>
            <Navbar navigation={props.navigation} />
        </View>
        : <View/> 
    );
}
const NavigateScreen = (props) => {
    const [location, setLocation] = useState(null);
    const [heading, setHeading] = useState("...");
    useEffect(() => {
        locationEventListner.subscribe(onLocationUpdated, "parent");
        compassEventListner.subscribe(onCompassUpdated);
        return async () => { 
            compassEventListner.unsubscribe();
            locationEventListner.unsubscribe();
        }
    },[]);
    const onCompassUpdated = (data) => {
        setHeading(data.heading);
    }
    const onLocationUpdated = (data) => {
        setLocation(data.data);
    }
    return (
        <NavigateChild {...props} location={location} heading={heading}/>
    )
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
        textAlign: 'left',
        fontFamily: theme.fonts.medium.fontFamily,
        fontWeight: 'bold',
    },
});
export default NavigateScreen;