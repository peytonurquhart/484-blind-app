import * as React from 'react';
import { useEffect } from 'react';
import { Slider } from '@miblanchard/react-native-slider';

export const MenuSlider = ({min=1, max=5, step=1, defaultValue=null, onChange=(value) => {}}) => {
    let current = defaultValue??min;
    return (
        <Slider 
        value={defaultValue??min} 
        minimumValue={min} 
        maximumValue={max} 
        step={step} 
        onValueChange={(v) => { if (v[0] != current) { current = v[0]; }}}
        onSlidingComplete={() => onChange(current) }
        />
    )
}