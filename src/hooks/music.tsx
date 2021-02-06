import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av'
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';

interface MusicContextData {
  handleSetMusic(music: any): void;
  handleStopMusic(): Promise<void>;
  handleFindMusic(): void;
  music: MusicProps;
  musicStatus: boolean;
  musics: MusicProps[];
}

interface MusicProps {
  albumId: string;
  creationTime: number;
  duration: number;
  filename: string;
  height: number;
  id: string;
  mediaType: string;
  modificationTime: number;
  uri: string;
  width: number;
}

const MusicContext = createContext<MusicContextData>({} as MusicContextData);

function useMusic(): MusicContextData {
  const context = useContext(MusicContext);

  if(!context) {
    throw new Error('useMusic must be used within an MusicProvider.');
  }

  return context;
}

const MusicProvider: React.FC = ({ children }) => {

  const [music, setMusic] = useState<MusicProps>({} as MusicProps);
  const [musics, setMusics] = useState<MusicProps []>([]);
  const [sound, setSound] = useState(new Audio.Sound());
  const [musicStatus, setMusicStatus] = useState(false);

  useEffect(() => {
    const loadMediaLibrary = async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status !== 'granted') {
        console.log('Library not granted');
        return;
      }

      const musics = await AsyncStorage.getItem('@RNMusicPlayer');

      if (musics) {
        await setMusics(JSON.parse(musics));
        return;
      }

      const response = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: 10000
      }).then((response: any) => {
       return response.assets.filter((music: any) => !music.filename.startsWith('AUD-'))
      })
      await setMusics(response);
      await AsyncStorage.setItem('@RNMusicPlayer', JSON.stringify(response));
    }
    loadMediaLibrary();
  }, []);

  useEffect(() => {

    try {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
      })
    } catch(err) {
      console.log(err)
    }

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : setMusicStatus(false);
  }, [sound]);

  const handleFindMusic = useCallback(async () => {
    const response = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 10000
    }).then((response: any) => {
     return response.assets.filter((music: any) => !music.filename.startsWith('AUD-'))
    })
    await setMusics(response);
    await AsyncStorage.setItem('@RNMusicPlayer', JSON.stringify(response));
    console.log('Gravando')
  }, [])

  const handleSetMusic = useCallback(async (music) => {
    setMusic(music);
    if(music) {
      if (sound._loaded) {
        await sound.unloadAsync();
      }
       await sound.loadAsync(
        {
          uri: music.uri
        },
        {
          shouldPlay: musicStatus,
        },
        false
      );
      setMusicStatus(sound._loaded);
      await sound.stopAsync();
      await sound.playAsync();
      setSound(sound);

    }
  }, []);

  const handleStopMusic = useCallback(async () => {
    sound._loaded ? await sound.pauseAsync() :  await sound.playAsync()
  
    setMusicStatus(prevState => !prevState);
  }, []); 

  return (
    <MusicContext.Provider value={{ handleSetMusic, music, handleStopMusic, musicStatus, musics, handleFindMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export { MusicProvider, useMusic };