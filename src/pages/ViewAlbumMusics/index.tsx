/* eslint-disable no-restricted-syntax */
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { FindMusic } from '~/assets/animations';
import { IAlbum } from '~/models/Album';
import { MusicFile } from '~/models/MusicFile';

import {
  Container,
  Header,
  Title,
  MusicsList,
  Music,
  MusicCover,
  MusicName,
} from './styles';

import { MusicPlaceholder } from '../../assets/icons';
import { PlayingMusic } from '../../components';
import { useMusic } from '../../hooks/music';

interface ViewAlbumMusicsProps {
  route: {
    params: {
      album: IAlbum;
    };
  };
}

function ViewAlbumMusics({ route }: ViewAlbumMusicsProps): ReactElement {
  const { album } = route.params;
  const { handleSetMusic, musics } = useMusic();
  const [albumMusics, setAlbumMusics] = useState<MusicFile[]>([]);
  const { goBack } = useNavigation();

  useEffect(() => {
    const loadMusics = () => {
      setAlbumMusics([]);
      for (const music of musics) {
        if (music.albumId === album.id) {
          setAlbumMusics((prevState) => [...prevState, music]);
        }
      }
    };
    loadMusics();
  }, [album.id, musics]);

  const handleSelectMusic = useCallback(
    (music) => {
      handleSetMusic(music);
    },
    [handleSetMusic],
  );

  return (
    <Container>
      <Header>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center',
          }}
          onPress={goBack}
        >
          <AntDesign name="arrowleft" size={24} color="#FFF" />
          <Title>{album.title}</Title>
        </TouchableOpacity>
      </Header>
      {albumMusics?.length > 0 ? (
        <MusicsList
          data={albumMusics}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }) => {
            const music: MusicFile = item as MusicFile;
            return (
              <Music key={music.id} onPress={() => handleSelectMusic(music)}>
                <MusicCover
                  source={
                    music.coverUrl ? { uri: music.coverUrl } : MusicPlaceholder
                  }
                />
                <MusicName>
                  {music.filename
                    .replace('.mp3', '')
                    .replace(/^[0-9]*/gm, '')
                    .replace('- ', '')}
                </MusicName>
              </Music>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LottieView source={FindMusic} autoPlay loop />
        </View>
      )}
      <PlayingMusic />
    </Container>
  );
}

export default ViewAlbumMusics;
