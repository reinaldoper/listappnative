/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import Home from './screens/Home';
import { styles } from './styles/style';
import Users from './screens/Users';
import LoginScreen from './screens/Login';

const Stack = createStackNavigator();

/**
 * App component is the root component of the application.
 * It sets up the navigation stack with three screens: Home, Users, and Login.
 * The initial screen is set to Login, and headers are hidden for all screens.
 * It also wraps the application with GluestackUIProvider for UI theming
 * and GestureHandlerRootView for gesture handling.
 */

export default function App() {
  return (
    <GestureHandlerRootView style={styles.home}>
      <NavigationContainer>
        <GluestackUIProvider config={config}>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Users" component={Users} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </GluestackUIProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
