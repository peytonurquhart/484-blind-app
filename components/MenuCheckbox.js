import * as React from 'react';
import { useState } from 'react';
import { Navbar } from './Navbar.js';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { theme } from '../style/theme.js';
import { DropMenu } from './DropMenu.js';
import { MenuSpacer } from './MenuSpacer.js';
import { MenuSlider } from './MenuSlider.js';

export const MenuCheckbox = ({ description = "", defaultValue = false, onChange = () => { } }) => {
    const [checked, setChecked] = useState(defaultValue)
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>{description}</Text>
            </View>
            <View>
                <RadioButton
                    value={checked}
                    status={checked === true ? 'checked' : 'unchecked'}
                    onPress={() => { onChange(!checked); setChecked(!checked) }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
    },
    text: {
        flex: 4,
        alignSelf: 'center',
    },
});
