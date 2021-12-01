import { DefaultTheme } from 'react-native-paper';
import * as Pallete from './pallete.js';

/* 
    Override any part of the DefaultTheme of Paper

    Here only some of the colors are overriden, and the
    rest of the theme is filled. Go to DefaultTheme def
    to see.
*/
export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Pallete.GRAY_BLUE,
      accent: Pallete.LIGHT_BLUE,
      background: DefaultTheme.colors.background,
      surface: DefaultTheme.colors.surface,
      accent: DefaultTheme.colors.accent,
      error: Pallete.GRAPEFRUIT,
      text: DefaultTheme.colors.text,
      onSurface: DefaultTheme.colors.onSurface,
      disabled: DefaultTheme.colors.disabled,
      placeholder: DefaultTheme.colors.placeholder,
      backdrop: DefaultTheme.colors.backdrop,
      notification: DefaultTheme.colors.notification,
    },
  };