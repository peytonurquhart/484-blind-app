import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Audio } from 'expo-av';
import { theme } from '../style/theme.js';
import { Navbar } from './Navbar.js';
import { playAudioFromFile } from '../util/audioAlert.js';

export default function VoiceCommandScreen({ navigation, onFinish = () => { } }) {
    const [recording, setRecording] = React.useState();

    // Start audio recording
    async function startRecording() {
        try {
            // Wait to request perissions from device
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            // Wait to start recording
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            // Recording started
            setRecording(recording);
        } catch (err) {
            // Error in recording, notify parent close and return null
            onFinish(null);
        }
    }

    // Stop audio recording
    async function stopRecording() {
        setRecording(undefined);
        // Wait to stop recording
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        onFinish(uri);
        playAudioFromFile(uri, true);
    }

    const buttonChild = (text) => {
        return (
            <Text>{text}</Text>
        )
    }

    return (
        <View style={styles.container}>
            <Button
                onPress={recording ? stopRecording : startRecording}
                style={styles.recordButton}
                contentStyle={styles.buttonContent}
                children={recording ? buttonChild('Done') : 'Voice Command'}
            />
            <Navbar navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordButton: {
        backgroundColor: theme.colors.accent,
        width: '80%',
        height: '40%',
        marginTop: '10%',
        marginBottom: '10%',
    },
    buttonContent: {
        height: '100%',
        width: '100%',
    },
});