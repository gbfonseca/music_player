import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading'
import { StatusBar, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import * as Font from 'expo-font';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';


export const App: React.FC = () => {

  // const [dataLoaded, setDataLoaded] = useState(false);


  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  if(!fontsLoaded) {
    return (
      <AppLoading />
    )
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#212121" />
      <View style={{ flex: 1, backgroundColor: "#212121" }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
}

export default App;