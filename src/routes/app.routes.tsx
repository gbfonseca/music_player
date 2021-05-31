import React from 'react';

import { Feather, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Albums from '~/pages/Albums';

import Home from '../pages/Home';
import Music from '../pages/Musics';
import Stacks from './stacks';

const App = createBottomTabNavigator();

const Routes: React.FC = () => {
  return (
    <>
      <App.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#44C68F',
          inactiveTintColor: '#FFF',
          tabStyle: {
            backgroundColor: '#212121',
          },
        }}
      >
        <App.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <Icon
                name="music"
                size={24}
                color={color}
                style={{ marginTop: 10 }}
              />
            ),
          }}
        />
        <App.Screen
          name="Music"
          component={Music}
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <Feather
                name="disc"
                size={24}
                color={color}
                style={{ marginTop: 10 }}
              />
            ),
          }}
        />
        <App.Screen
          name="Albums"
          component={Albums}
          options={{
            title: '',
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="albums-outline"
                size={24}
                color={color}
                style={{ marginTop: 10 }}
              />
            ),
          }}
        />
        <App.Screen
          name="Playing"
          component={Stacks}
          options={{
            tabBarVisible: false,
            tabBarButton: () => null,
          }}
        />
      </App.Navigator>
    </>
  );
};

export default Routes;
