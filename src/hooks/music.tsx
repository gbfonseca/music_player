import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av'
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';

interface MusicContextData {
  handleSetMusic(music: any, options?: any): void;
  handleStopMusic(): Promise<void>;
  handleFindMusic(): void;
  music: MusicProps;
  musicStatus: boolean;
  musics: MusicProps[];
  musicDuration: any;
  loading: boolean;
  sound: any;
  setMusicOptions(musicOptions: any): void;
  musicOptions: any;
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

interface SoundProps {
  durationMillis: number
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
  const [musicDuration, setMusicDuration] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [musicOptions, setMusicOptions] = useState({
    shouldPlay: musicStatus,
    isLooping: false,
    positionMillis: 0,
    volume: 1.0
  })

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
      });

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
    setLoading(true);
    const response = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 10000
    }).then((response: any) => {
     return response.assets.filter((music: any) => !music.filename.startsWith('AUD-'))
    })
    await setMusics(response);
    await AsyncStorage.setItem('@RNMusicPlayer', JSON.stringify(response));
    setLoading(false);

  }, [])

  const handleSetMusic = useCallback(async (music, options?) => {
    setMusic(music);
    if(music) {
      if (sound._loaded) {
        await sound.unloadAsync();
      }
      await sound.loadAsync(
        {
          uri: music.uri
        },
        options,
        false
       );
      await sound.stopAsync();
      await sound.playAsync();
      setSound(sound);
      sound.getStatusAsync().then((response: any) => {
        setMusicDuration(response.durationMillis as number)
        setMusicStatus(response.isPlaying);
      })
    }
  }, [musicOptions]);

  const handleStopMusic = useCallback(async () => {
    musicStatus ? await sound.pauseAsync() :  await sound.playAsync()
    setMusicStatus(prevState => !prevState);

  }, [musicStatus]);

  return (
    <MusicContext.Provider value={{
      handleSetMusic,
      music,
      handleStopMusic,
      musicStatus,
      musics,
      handleFindMusic,
      musicDuration,
      loading,
      sound,
      setMusicOptions,
      musicOptions
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export { MusicProvider, useMusic };
