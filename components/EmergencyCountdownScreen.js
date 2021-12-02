import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { playAudioFromText } from '../util/audioAlert.js';
import { sleep } from '../util/sleep.js';
import { theme } from '../style/theme.js';
import { Navbar } from './Navbar.js';
import * as Route from '../Routes.js';
import * as Speech from 'expo-speech';

const COUNTDOWN_SECONDS = 15;
const COUNTDOWN_AUDIO = "emergency. touch screen to cancel.";
const CANCELLED_AUDIO = "emergency cancelled"

const EmergencyCountdownScreen = (props) => {
    const [coundownFinished, setCountdownFinished] = useState(false);
    const [timer, setTimer] = useState(COUNTDOWN_SECONDS);
    const isFocused = useIsFocused();
    useEffect(() => {
        let isMounted = true;
        async function waitToSpeakAsync(ms, text) {
            await (sleep(ms));
            if (isMounted) {
            setTimer(timer - 1);
            Speech.isSpeakingAsync().then((status) => {
                if (!status) { playAudioFromText(text, false, true); }
            });
            }
        }
        if (timer > 0) {
            waitToSpeakAsync(1000, COUNTDOWN_AUDIO);
        } else {
            setCountdownFinished(true);
        }
        return () => { isMounted = false };
    }, [timer])
    useEffect(() => {
        if (coundownFinished && isFocused) {
            props.navigation.navigate(Route.EMERGENCY_SCREEN);
        }
    }, [coundownFinished])
    const cardOnPress = () => {
        playAudioFromText(CANCELLED_AUDIO, false, true);
        props.navigation.navigate(Route.HOME_SCREEN)
    }
    return (
        <View style={styles.container}>
            <Card style={styles.card} onPress={cardOnPress}>
            <Card.Content style={styles.content}>
                <Text style={styles.cardContent}>{timer}</Text>
            </Card.Content>
            </Card>
            <Navbar navigation={props.navigation} disabled={true}/>
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
    card: {
        backgroundColor: theme.colors.error,
        width: '80%',
        height: '40%',
        marginTop: '10%',
        marginBottom: '10%',
    },
    content: {
        paddingVertical: '40%',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    cardContent: {
        flex: 1,
        textAlign: 'center',
        fontFamily: theme.fonts.medium.fontFamily,
        fontWeight: 'bold',
        fontSize: 40,
    },
});
  
export default EmergencyCountdownScreen;