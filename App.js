import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './contexts/ThemeContext';
import CameraScreen from './components/CameraScreen';
import CreatorDashboard from './screens/CreatorDashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Dashboard" component={CreatorDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
  }
