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
import * as Alert from '../util/RouteListner.js';
import { playAudioFromText } from '../util/audioAlert.js';
import { route1 } from '../_testing/route.json.js';

const LOCATION_UPDATE_INTERVAL_MS = 900;
const COMPASS_UPDATE_INTERVAL_MS = 50;
const INITIAL_LOCATION_INTERVAL_REQUIREMENT = 5;
const INITIAL_LOCATION_ACCURACY_REQUIREMENT_FT = 35;
const LOADING_DESC = "Waiting for data...";
const LOADING_AUDIO = "please wait.";
const READY_AUDIO = "navigate ready."
const FEET_PER_METER = 3.280839895;

Camera.requestCameraPermissionsAsync().then(
    () => console.log("Success: Camera permission enabled!"),
    () => console.log("Warning: Camera permission denied!")
);
Location.requestForegroundPermissionsAsync().then(
    () => console.log("Success: Location permissions enabled!"), 
    () => console.log("Warning: Location permission denied!") 
);
const locationEventListner = new Loc.LocationListener(
    Location.getCurrentPositionAsync,
    { accuracy: Location.Accuracy.Highest },
    LOCATION_UPDATE_INTERVAL_MS,
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
const routeAlertListner = new Alert.RouteListner();

const parseLocation = (loc, initialLoc) => {
    if(!initialLoc||!initialLoc.coords) { return LOADING_DESC; }
    if(!loc||!loc.coords) { return LOADING_DESC; }
    let coords = loc.coords;
    let s = "Location:";
    s += "\n   ALT:   " + (coords.altitude*FEET_PER_METER).toString().substring(0, 12) + " ft";
    s += "\n   LAT:   " + coords.latitude.toString().substring(0, 12) + " deg";
    s += "\n   LON:   " + coords.longitude.toString().substring(0, 12) + " deg";
    s += "\n   Accuracy:   " + (coords.accuracy*FEET_PER_METER).toString().substring(0, 5) + " ft";
    return s;
}
const parseTrip = (heading, angle) => {
    let s = "Trip:";
    s += "\n   Heading:   " + heading;
    s += "\n   Direction:   " + angle;
    return s;
}
const parseInstruction = (instr) => {
    if(!instr) { return LOADING_DESC; }
    let s = "Instruction:";
    s += "\n   Step:   " + instr.step;
    s += "\n   Align:   " + (instr.align??"");
    s += "\n   Action:   " + (instr.action??"");
    s += "\n   Alert:   " + (instr.alert??"");
    return s;
}

const instructionAudio = (instr) => {
    if(!instr) { return ""; }
    let s = "";
    if(instr.action) { s += instr.action; }
    if(instr.alert) { s += instr.alert; }
    return s;
}

const NavigateChild = (props) => {
    const [updatedLoc, setUpdatedLoc] = useState(false);
    const [updatedInstr, setUpdatedInstr] = useState(false);
    useEffect(() => {
        if(props.instruction) {
            setUpdatedInstr(true);
            playAudioFromText(instructionAudio(props.instruction), false, true);
        }
    }, [props.instruction]);
    useEffect(() => {
        if(props.location) {
            setUpdatedLoc(true);
        }
    }, [props.location]);
    useEffect(() => {
        if(props.heading&&props.isCalibrating) {
            playAudioFromText(props.heading, false, false);
        }
    }, [props.heading, props.isCalibrating])
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
    useEffect(() => {
        let isMounted = true;
        if(updatedInstr) {
        async function resetAsync(ms) {
            await sleep(ms);
            if(isMounted) { setUpdatedInstr(false); }
        }
        resetAsync(1000);
    }
        return () => { isMounted = false };
    }, [updatedInstr])
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back}>

            <Card style={updatedInstr? styles.cardOnUpdate2 : styles.card}>
            <Card.Content style={styles.content}>
                <Text style={styles.cardContent}>{parseInstruction(props.instruction)}</Text>
            </Card.Content>
            </Card>

            <Card style={updatedLoc? styles.cardOnUpdate : styles.card}>
            <Card.Content style={styles.content}>
                <Text style={styles.cardContent}>{parseLocation(props.location, props.initialLocation)}</Text>
            </Card.Content>
            </Card>

            <Card style={styles.card}>
            <Card.Content style={styles.content}>
                <Text style={styles.cardContent}>{parseTrip(props.heading, props.angle)}</Text>
            </Card.Content>
            </Card>

            </Camera>
            <Navbar navigation={props.navigation} />
        </View>
    );
}

const NavigateScreen = (props) => {
    const [locationUpdateCounter, setLocationUpdateCounter] = useState(0); 
    const [firstLocation, setFirstLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [heading, setHeading] = useState("...");
    const [instruction, setInstruction] = useState(null);
    const [angle, setAngle] = useState("...");
    const [isCalibrating, setIsCalibrating] = useState(false);
    useEffect(() => {
        if(firstLocation) {
            routeAlertListner.subscribe(onInstructionUpdated, "parent", route1);
        }
        return () => { 
            routeAlertListner.unsubscribe();
        }
    }, [firstLocation])
    useEffect(() => {
        playAudioFromText(LOADING_AUDIO, false, true);
        locationEventListner.subscribe(onLocationUpdated, "parent");
        compassEventListner.subscribe(onCompassUpdated);
        return () => { 
            routeAlertListner.unsubscribe();
            compassEventListner.unsubscribe();
            locationEventListner.unsubscribe();
        }
    },[]);
    useEffect(() => {
        if (location) {
            setLocationUpdateCounter(locationUpdateCounter + 1);
        }
        if (!firstLocation && location && locationUpdateCounter >= INITIAL_LOCATION_INTERVAL_REQUIREMENT) {
            if ((location.coords.accuracy * FEET_PER_METER) <= INITIAL_LOCATION_ACCURACY_REQUIREMENT_FT) {
                playAudioFromText(READY_AUDIO, false, true);
                setFirstLocation(location);
            }
        }
    }, [location])
    const onCompassUpdated = (data) => {
        switch (data.type) {
            case Compass.HEADING_CHANGE_ACTIVE:
                setHeading(data.heading) 
                if(isCalibrating) {
                    playAudioFromText(data.heading, false, true);
                }
                break;
            case Compass.ANGLE_CHANGE_ACTIVE:
                setAngle(data.angle);
                break;
        }
    }
    const onLocationUpdated = (data) => {
        setLocation(data.data);
    }
    const onInstructionUpdated = (data) => {
        setInstruction(data.data);
        if(data.data.calibrate==true) {
            setIsCalibrating(true);
        } else {
            setIsCalibrating(false);
        }
    }
    return (
        <NavigateChild {...props} 
            location={location} 
            heading={heading}
            angle={angle}
            instruction={instruction}
            initialLocation={firstLocation}
            isCalibrating={isCalibrating}
            />
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
        paddingTop: '10%',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '80%',
        height: '20%',
        marginBottom: '10%',
    },
    cardOnUpdate2: {
        backgroundColor: 'rgba(255, 230, 109, 0.5)',
        width: '80%',
        height: '20%',
        marginBottom: '10%',
    },
    cardOnUpdate: {
        backgroundColor: 'rgba(175, 225, 175, 0.5)',
        width: '80%',
        height: '20%',
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