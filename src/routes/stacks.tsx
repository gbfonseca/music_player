import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Playing from '../pages/Playing';

const App = createStackNavigator();

const Stacks: React.FC = () => {
  return (
    <>
      <App.Navigator screenOptions={{
        headerShown: false
      }}>
        <App.Screen name="Playing" component={Playing} />
      </App.Navigator>
    </>
  );
}

export default Stacks;