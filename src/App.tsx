import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { MusicProvider } from './hooks/music';
import Routes from './routes';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="default" backgroundColor="#212121" />
      <MusicProvider>
        <View style={{ flex: 1, backgroundColor: '#212121' }}>
          <Routes />
        </View>
      </MusicProvider>
    </NavigationContainer>
  );
};

export default App;
