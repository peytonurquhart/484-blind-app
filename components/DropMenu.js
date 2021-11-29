import * as React from 'react';
import { useState, useEffect } from 'react';
import DropDown from "react-native-paper-dropdown";

export const DropMenu = ({label="", values=[], onSelect=() => {}}) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [selection, setSelection] = useState(null);
    useEffect(() => {
        if(selection) {
            onSelect(selection);
        }
    },[selection])
    return (
        <DropDown
        label={label}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={selection}
        setValue={setSelection}
        list={values}
    />
    )

}