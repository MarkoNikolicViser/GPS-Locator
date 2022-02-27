import { DefaultTheme } from 'react-native-paper'
const tema=true
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: tema?'#000000':'red',
    primary: tema?'#8edd9b':'red',
    secondary: tema?'#414757':'red',
    error: tema?'#f13a59':'red',
  },
}
