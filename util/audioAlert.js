import { store } from '../redux/store.js';
import * as Settings from '../redux/settingsReducer.js';
import * as Speech from 'expo-speech';

export function playAudio(str, forcePlay=false) {
    let state = store.getState();
    if((state[Settings.DO_AUDIO_QUEUES]&&str)||(forcePlay&&str)) {
        Speech.speak(str);
    }
}