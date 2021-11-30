import { store } from '../redux/store.js';
import * as Settings from '../redux/settingsReducer.js';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

export function playAudioFromText(str, forcePlay=false) {
    let state = store.getState();
    if((state[Settings.DO_AUDIO_QUEUES]&&str)||(forcePlay&&str)) {
        Speech.speak(str);
    }
}

export async function playAudioFromFile(uri, forcePlay = false) {
    let state = store.getState();
    if (!state[Settings.DO_AUDIO_QUEUES] && !forcePlay) {
        return;
    }
    const AudioPlayer = new Audio.Sound();
    try {
        await AudioPlayer.loadAsync({ uri: uri }, {}, true);
        const playerStatus = await AudioPlayer.getStatusAsync();
        if (playerStatus.isLoaded) {
            await AudioPlayer.playAsync();
        }
    } catch { console.log("Warning: playAudioFromFile: couldnt't load audio") }
    // TBD unload audio here, have to wait for audio done callback from AudioPlayer
}

