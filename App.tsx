import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import PageAccueil from './Pages/PageAccueil';
import Score from './Pages/Score';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageAccueil">
        <Stack.Screen name="PageAccueil" component={PageAccueil} />
        <Stack.Screen name="Score" component={Score} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
