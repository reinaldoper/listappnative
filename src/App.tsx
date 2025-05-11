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
