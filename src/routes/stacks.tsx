import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Options from '~/pages/Options';

import Playing from '../pages/Playing';

const App = createStackNavigator();

const Stacks: React.FC = () => {
  return (
    <>
      <App.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <App.Screen name="Playing" component={Playing} />
        <App.Screen name="Options" component={Options} />
      </App.Navigator>
    </>
  );
};

export default Stacks;
