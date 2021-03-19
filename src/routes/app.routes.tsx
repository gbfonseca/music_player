import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
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
      inactiveTintColor:'#FFF',
      tabStyle: {
        backgroundColor: '#212121'
      }
      }}
    >
      <App.Screen name="Home" component={Home} options={{
        title: '',
        tabBarIcon: ({color}) => (
          <Icon name="music" size={24} color={color} style={{ marginTop: 10 }} />
        )
      }} />
      <App.Screen name="Music" component={Music} options={{
        title: '',
        tabBarIcon: ({color}) => (
          <Icon name="star" size={24} color={color} style={{ marginTop: 10 }} />
        )
      }} />
      <App.Screen name="Playing" component={Stacks} options={{
        tabBarVisible: false,
        tabBarButton: () => null
      }} />
    </App.Navigator>
    </>
  );
}

export default Routes;
