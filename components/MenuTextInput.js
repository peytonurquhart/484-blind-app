import * as React from 'react';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';

export const MenuTextInput = ({label=null, defaultValue=null, onChange=()=>{}}) => {
    const [text, setText] = useState(defaultValue??null)
    return (
        <TextInput
        mode="outlined"
        label={defaultValue&&!text ? defaultValue : !defaultValue&&!text ? label : null}
        value={text??defaultValue}
        onChangeText={(v) => { if (v != text) { onChange(v); setText(v) } }}
        />
    )
}

