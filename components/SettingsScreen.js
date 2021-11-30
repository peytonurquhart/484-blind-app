import React, {
    Component
 } from 'react';
import { Navbar } from './Navbar.js';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Text} from 'react-native';
import { theme } from '../style/theme.js';
import { DropMenu } from './DropMenu.js';
import { MenuSpacer } from './MenuSpacer.js';
import { MenuSlider } from './MenuSlider.js';
import { MenuTextInput } from './MenuTextInput.js';
import { MenuCheckbox } from './MenuCheckbox.js';
import { connect } from "react-redux";
import * as Settings from '../redux/settingsReducer.js';
const MENU_SPACING = 20;
const SettingsScreen = (props) => {
    const dispatchSetting = (type, value) => {
        props.dispatch({ type: type, value: value, });
    }
    const getSettingState = (type, _default=null) => {
        return props.state[type]??_default;
    }
    const notificationTypes = [
        {
          label: "Vibration 1",
          value: "vibraton1",
        },
        {
          label: "Vibration 2",
          value: "vibration2",
        },
        {
          label: "Vibration 3",
          value: "vibration3",
        },
        {
            label: "Vibration 4",
            value: "vibration4",
          },
      ];
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <MenuSpacer amount={MENU_SPACING}/>

            <Text style={{fontWeight: 'bold'}}> Settings </Text>
            <MenuSpacer amount={MENU_SPACING*2}/>

            <Text> Emergency Contact Name </Text>
            <MenuTextInput label={"Name"} defaultValue={getSettingState(Settings.EMER_CONTACT_NAME)} onChange={(value) => dispatchSetting(Settings.EMER_CONTACT_NAME, value)}/>
            <MenuSpacer amount={MENU_SPACING}/>

            <Text> Emergency Contact Phone Number </Text>
            <MenuTextInput label={"Phone Number"} defaultValue={getSettingState(Settings.EMER_CONTACT_PHONE)} onChange={(value) => dispatchSetting(Settings.EMER_CONTACT_PHONE, value)}/>
            <MenuSpacer amount={MENU_SPACING}/>

            <Text> Vibration Intensity </Text>
            <MenuSlider min={1} max={5} defaultValue={getSettingState(Settings.VIBR_INTENSITY)} onChange={(value) => dispatchSetting(Settings.VIBR_INTENSITY, value)}/>
            <MenuSpacer amount={MENU_SPACING}/>     

            <Text> Staircase Vibration </Text>
            <DropMenu label="Select" values={notificationTypes} defaultValue={getSettingState(Settings.STAIRS_VIBR)} onSelect={(sel) => dispatchSetting(Settings.STAIRS_VIBR, sel)}/>
            <MenuSpacer amount={MENU_SPACING}/>

            <Text> Open Door Vibration </Text>
            <DropMenu label="Select" values={notificationTypes} defaultValue={getSettingState(Settings.OPEN_DOOR_VIBR)} onSelect={(sel) => dispatchSetting(Settings.OPEN_DOOR_VIBR, sel)}/>
            <MenuSpacer amount={MENU_SPACING}/>

            <Text> Closed Door Vibration </Text>
            <DropMenu label="Select" values={notificationTypes} defaultValue={getSettingState(Settings.CLOSED_DOOR_VIBR)} onSelect={(sel) => dispatchSetting(Settings.CLOSED_DOOR_VIBR, sel)}/>
            <MenuSpacer amount={MENU_SPACING}/>

            <Text> Moving Object in Proximity Vibration </Text>
            <DropMenu label="Select" values={notificationTypes} defaultValue={getSettingState(Settings.MOVING_OBJ_VIBR)} onSelect={(sel) => dispatchSetting(Settings.MOVING_OBJ_VIBR, sel)}/>
            <MenuSpacer amount={MENU_SPACING}/>

            <MenuCheckbox description={"Call Emergency Contact"} defaultValue={getSettingState(Settings.DO_CALL_CONTACT, false)} onChange={(value) => dispatchSetting(Settings.DO_CALL_CONTACT, value)}/>
            <MenuSpacer amount={MENU_SPACING}/>
            
            <MenuCheckbox description={"Call 911"} defaultValue={getSettingState(Settings.DO_CALL_911, false)} onChange={(value) => dispatchSetting(Settings.DO_CALL_911, value) } />
            <MenuSpacer amount={MENU_SPACING}/>

        <MenuSpacer amount={MENU_SPACING*4}/>
        </ScrollView>
        <Navbar navigation={props.navigation} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: theme.colors.accent,
    },
    scrollView: {
      backgroundColor: 'rgba(52, 52, 52, 0.4)',
      marginHorizontal: 20,
      paddingHorizontal: 20,
    },
  });

  const mapStateToProps = (state) => ({
    state: state,
  });
  
export default connect(mapStateToProps)(SettingsScreen);
  