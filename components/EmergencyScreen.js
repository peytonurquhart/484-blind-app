import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { connect } from "react-redux";
import { Navbar } from './Navbar.js';
import { playAudioFromText } from '../util/audioAlert.js';
import { sleep } from '../util/sleep.js';
import { theme } from '../style/theme.js';
import * as Settings from '../redux/settingsReducer.js';
import * as Route from '../Routes.js';

const callBothDesc = (number) => {
    return "Calling emergency contact: "+number+" If they do not answer, calling 911...";
}
const callContactDesc = (number) => {
    return "Calling emergency contact: "+number+"...";
}
const call911Desc = () => {
    return "Calling 911...";
}
const cantCallDesc = () => {
    return "Settings indicate that you would not like to contact anybody in case of emergency, or you did not specify an emergency contact number!";
}
const EmergencyScreen = (props) => {
    const getSettingState = (type, _default = null) => {
        return props.state[type] ?? _default;
    }
    const [callContact, setCallContact] = useState(getSettingState(Settings.DO_CALL_CONTACT, false));
    const [callNumber, setCallNumber] = useState(getSettingState(Settings.EMER_CONTACT_PHONE, ""));
    const [call911, setCall911] = useState(getSettingState(Settings.DO_CALL_911, false));
    const [callDesc, setCallDesc] = useState(() => () => cantCallDesc());
    useFocusEffect(
    useCallback(() => {
        async function s(ms) {
            await (sleep(ms));
            playAudioFromText(callDesc("."), false, true);
        }
        s(2000);
    })
    );
    useEffect(() => {
        setCallContact(getSettingState(Settings.DO_CALL_CONTACT, false));
        setCall911(getSettingState(Settings.DO_CALL_911, false));
        setCallNumber(getSettingState(Settings.EMER_CONTACT_PHONE, ""));
    });
    useEffect(() => {
        callContact && call911 && callNumber != "" ?
        setCallDesc(() => callBothDesc)
        : callContact && callNumber != "" ?
        setCallDesc(() => callContactDesc)
        : call911 ?
        setCallDesc(() => call911Desc)
        :
        setCallDesc(() => cantCallDesc)
    }, [callContact, callNumber, call911])
    const cardOnPress = () => {
        playAudioFromText("emergency cancelled", false, true);
        props.navigation.navigate(Route.HOME_SCREEN)
    }
    return (
        <View style={styles.container}>
            <Card style={styles.card} onPress={cardOnPress}>
                <Card.Content style={styles.content}>
                    <Text style={styles.buttonContent}>{callDesc(callNumber)}</Text>
                </Card.Content>
            </Card>
            <Navbar navigation={props.navigation} />
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
    buttonContent: {
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