import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import LottieView from 'lottie-react-native';

import { SplashAnimation } from '../assets/animations';
import AppRoutes from './app.routes';

export const App: React.FC = () => {
  // const [dataLoaded, setDataLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
        <LottieView source={SplashAnimation} autoPlay loop />
      </View>
    );
  }

  return <AppRoutes />;
};

export default App;
