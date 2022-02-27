import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  Mapa,
  AlowTracking,
  ZahtevZaPracenje,
  Root
} from './src/screens'
import { TProvider } from './src/state/context'
const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <TProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={Root} />
            {/* <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Map" component={Mapa} />
            <Stack.Screen name="AlowTracking" component={AlowTracking} />
            <Stack.Screen name="Zahtev" component={ZahtevZaPracenje} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </TProvider>
    </Provider>
  )
}
