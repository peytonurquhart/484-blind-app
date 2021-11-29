import * as React from 'react';
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar.js';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Text} from 'react-native';
import { theme } from '../style/theme.js';
import { DropMenu } from './DropMenu.js';
import { MenuSpacer } from './MenuSpacer.js';
import { Slider } from '@miblanchard/react-native-slider';

export const MenuSlider = ({min=1, max=5, step=1, defaultValue=null, onChange=(value) => {}}) => {
    let current = defaultValue??min;
    useEffect(() => {
        onChange(current);
    },[current])
    return (
        <Slider 
        value={defaultValue??min} 
        minimumValue={min} 
        maximumValue={max} 
        step={step} 
        onValueChange={(v) => { if (v[0] != current) { current = v[0]; onChange(v[0]); }}}
        />
    )
}