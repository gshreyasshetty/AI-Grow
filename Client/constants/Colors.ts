/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  WHITE: '#fff',
  PRIMARY:'#000',
  GREY:'#666',
  GRAY:'#666',
  BLACK:'#000',
  GRAY_LIGHT: '#E0E0E0',
  GRAY_MEDIUM: '#B0B0B0',
  GRAY_DARK: '#808080',
  BACKGROUND_LIGHT: '#F5F5F5',
  TEXT_DARK: '#333333',
  PRIMARy: '#3498db', // Example primary color
  SECONDARY: '#2ecc71', // Example secondary color
  ACCENT: '#e74c3c', 
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
