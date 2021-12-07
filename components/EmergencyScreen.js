import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { connect } from "react-redux";
import { playAudioFromText } from '../util/audioAlert.js';
import { Navbar } from './Navbar.js';
import { theme } from '../style/theme.js';
import * as Settings from '../redux/settingsReducer.js';
import * as Route from '../Routes.js';

const CANCELLED_AUDIO = "emergency cancelled";

const POSTFIX_AUDIO = ". touch screen to cancel.";

const CALL_BOTH_AUDIO = (number) => {
    return "Calling emergency contact: "+number+" If they do not answer, calling 911...";
}
const CALL_CONTACT_AUDIO = (number) => {
    return "Calling emergency contact: "+number+"...";
}
const CALL_911_AUDIO = () => {
    return "Calling 911...";
}
const CANT_CALL_AUDIO = () => {
    return "Settings indicate that you would not like to contact anybody in case of emergency, or you did not specify an emergency contact number!";
}

const EmergencyScreen = (props) => {
    const getSettingState = (type, _default = null) => {
        return props.state[type] ?? _default;
    }
    const [callContact, setCallContact] = useState(getSettingState(Settings.DO_CALL_CONTACT, false));
    const [callNumber, setCallNumber] = useState(getSettingState(Settings.EMER_CONTACT_PHONE, ""));
    const [call911, setCall911] = useState(getSettingState(Settings.DO_CALL_911, false));
    const [callDesc, setCallDesc] = useState(() => () => CANT_CALL_AUDIO());
    const [focusReady, setFocusReady] = useState(false);
    useFocusEffect(
        useCallback(() => { setFocusReady(true); })
    );
    useEffect(() => {
        setCallContact(getSettingState(Settings.DO_CALL_CONTACT, false));
        setCall911(getSettingState(Settings.DO_CALL_911, false));
        setCallNumber(getSettingState(Settings.EMER_CONTACT_PHONE, ""));
    });
    useEffect(() => {
        callContact && call911 && callNumber != "" ?
        setCallDesc(() => CALL_BOTH_AUDIO)
        : callContact && callNumber != "" ?
        setCallDesc(() => CALL_CONTACT_AUDIO)
        : call911 ?
        setCallDesc(() => CALL_911_AUDIO)
        :
        setCallDesc(() => CANT_CALL_AUDIO)
    }, [callContact, callNumber, call911])
    useEffect(() => {
        if(focusReady) {
            playAudioFromText(callDesc(".")+POSTFIX_AUDIO, false, true);
        }
    }, [callDesc])
    const cardOnPress = () => {
        playAudioFromText(CANCELLED_AUDIO, false, true);
        props.navigation.reset({ index: 0, routes: [{ name: Route.HOME_SCREEN}]});
    }
    return (
        <View style={styles.container}>
            <Card style={styles.card} onPress={cardOnPress}>
            <Card.Content style={styles.content}>
                <Text style={styles.cardContent}>{callDesc(callNumber)}</Text>
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
    },
});

const mapStateToProps = (state) => ({
    state: state,
  });
  
export default connect(mapStateToProps)(EmergencyScreen);