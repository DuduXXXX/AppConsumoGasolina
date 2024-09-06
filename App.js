import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Consumo from './src/pages/Consumo';

const Stack = createNativeStackNavigator();

const App = () => {
  const screenOptions = { headerShown: false };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Consumo" component={Consumo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;