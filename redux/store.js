import * as Settings from './settingsReducer.js';
import { createStore } from 'redux';

export const store = createStore(Settings.settingsReducer);