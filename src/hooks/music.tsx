/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import { MusicFile } from '~/models/MusicFile';

interface MusicContextData {
  handleSetMusic(music: MusicFile, options?: AVPlaybackStatus): void;
  handleStopMusic(): Promise<void>;
  handleFindMusic(): void;
  music: MusicProps;
  musicStatus: boolean;
  musics: MusicProps[];
  musicDuration: any;
  loading: boolean;
  sound: Audio.Sound;
  setMusicOptions(musicOptions: any): void;
  musicOptions: any;
  handleFindCovers(): void;
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
  coverUrl?: string;
}

const MusicContext = createContext<MusicContextData>({} as MusicContextData);

function useMusic(): MusicContextData {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error('useMusic must be used within an MusicProvider.');
  }

  return context;
}

const MusicProvider: React.FC = ({ children }) => {
  const [music, setMusic] = useState<MusicProps>({} as MusicProps);
  const [musics, setMusics] = useState<MusicProps[]>([]);
  const [sound, setSound] = useState(new Audio.Sound());
  const [musicStatus, setMusicStatus] = useState(false);
  const [musicDuration, setMusicDuration] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [musicOptions, setMusicOptions] = useState({
    shouldPlay: musicStatus,
    isLooping: false,
    positionMillis: 0,
    volume: 1.0,
  });

  useEffect(() => {
    const loadMediaLibrary = async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status !== 'granted') {
        console.log('Library not granted');
        return;
      }
      const musicsStoraged = await AsyncStorage.getItem('@RNMusicPlayer');

      if (musics) {
        await setMusics(JSON.parse(musicsStoraged as string) as MusicProps[]);
      }
      const response = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: 10000,
      });

      await setMusics(response.assets as MusicProps[]);
      await AsyncStorage.setItem('@RNMusicPlayer', JSON.stringify(response));
    };
    loadMediaLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      });
    } catch (err) {
      console.log(err);
    }

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : setMusicStatus(false);
  }, [sound]);

  const handleFindMusic = useCallback(async () => {
    setLoading(true);
    await AsyncStorage.removeItem('@RNMusicPlayer');
    const response = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 10000,
    });
    setMusics(response.assets as MusicFile[]);
    await AsyncStorage.setItem('@RNMusicPlayer', JSON.stringify(response));
    setLoading(false);
  }, []);

  const handleSetMusic = useCallback(
    async (musicSet, options?) => {
      setMusic(musicSet);
      if (musicSet) {
        if (sound._loaded) {
          await sound.unloadAsync();
        }
        await sound.loadAsync(
          {
            uri: musicSet.uri,
          },
          options,
          false,
        );
        await sound.stopAsync();
        await sound.playAsync();
        setSound(sound);
        sound.getStatusAsync().then((response: any) => {
          setMusicDuration(response.durationMillis as number);
          setMusicStatus(response.isPlaying);
        });
      }
    },
    [sound],
  );

  const handleStopMusic = useCallback(async () => {
    musicStatus ? await sound.pauseAsync() : await sound.playAsync();
    setMusicStatus((prevState) => !prevState);
  }, [musicStatus, sound]);

  const handleFindCovers = useCallback(async () => {
    musics.map(async (musicMapped) => {
      let coverPath;
      let coverFilename;
      await MediaLibrary.getAssetsAsync({
        first: 10000,
        album: musicMapped.albumId,
      }).then((responseCover) => {
        return responseCover.assets.filter((cover) => {
          return (
            (coverPath = cover.uri.replace(cover.filename, '')),
            (coverFilename = cover.filename)
          );
        });
      });
      if (coverPath === musicMapped.uri.replace(musicMapped.filename, '')) {
        musicMapped.coverUrl = coverPath + coverFilename;
      }
      return !musicMapped.filename.startsWith('AUD-');
    });
  }, [musics]);

  return (
    <MusicContext.Provider
      value={{
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
        musicOptions,
        handleFindCovers,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export { MusicProvider, useMusic };
