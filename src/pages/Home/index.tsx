import React, { useCallback } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Header,
  Title,
  Button,
  ButtonText,
  RecentlyPlayed,
  SubTitle,
  MusicRecently,
  MostPlayed,
  MusicMostPlay,
  Gender,
  GenderItem,
  GenderText,
  Play,
  ImageMusic,
} from './styles';

import { SplashAnimation } from '../../assets/animations';
import { PlayIcon, MusicPlaceholder } from '../../assets/icons';
import { PlayingMusic } from '../../components';
import { useMusic } from '../../hooks/music';

interface Music {
  name: string;
  artist: string;
  id: number;
  path?: string;
}

const genders = [
  {
    id: 1,
    name: 'Pagode',
  },
  {
    id: 2,
    name: 'Rock',
  },
  {
    id: 3,
    name: 'Pop',
  },
  {
    id: 4,
    name: 'MPB',
  },
  {
    id: 5,
    name: 'Jazz',
  },
  {
    id: 6,
    name: 'Funk',
  },
  {
    id: 7,
    name: 'Samba',
  },
];

const Home: React.FC = () => {
  const { handleSetMusic, musics, handleFindMusic, loading } = useMusic();
  const { navigate } = useNavigation();
  const handleSelectMusic = useCallback(
    (music) => {
      handleSetMusic(music);
    },
    [handleSetMusic],
  );

  if (loading) {
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

  return (
    <Container>
      <Header>
        <Title>Músicas</Title>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <LinearGradient
            colors={['#45739d', '#44c68f']}
            style={{
              height: 50,
              borderRadius: 25,
              paddingHorizontal: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button onPress={handleFindMusic}>
              <ButtonText>Adicionar pasta</ButtonText>
            </Button>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => navigate('Playing', { screen: 'Options' })}
          >
            <Icon
              name="settings"
              size={24}
              color="#FFF"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        </View>
      </Header>
      <RecentlyPlayed>
        <SubTitle>Tocadas Recentemente</SubTitle>
        <FlatList
          horizontal
          initialNumToRender={2}
          keyExtractor={(music) => String(music?.id)}
          data={musics}
          renderItem={({ item: music }) => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                handleSelectMusic(music);
                console.log(music);
              }}
            >
              <MusicRecently>
                <ImageMusic
                  source={
                    music.coverUrl ? { uri: music.coverUrl } : MusicPlaceholder
                  }
                />
                <Play source={PlayIcon} />
              </MusicRecently>
            </TouchableOpacity>
          )}
        />
      </RecentlyPlayed>
      <MostPlayed>
        <SubTitle>As mais tocadas</SubTitle>
        <FlatList
          horizontal
          keyExtractor={(music) => String(music?.id)}
          data={musics}
          renderItem={({ item: music }) => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => handleSelectMusic(music)}
            >
              <MusicMostPlay>
                <ImageMusic
                  source={
                    music.coverUrl ? { uri: music.coverUrl } : MusicPlaceholder
                  }
                />
                <Play source={PlayIcon} />
              </MusicMostPlay>
            </TouchableOpacity>
          )}
        />
      </MostPlayed>
      <Gender>
        <SubTitle>Gênero</SubTitle>
        <FlatList
          horizontal
          keyExtractor={(gender) => gender.id.toString()}
          data={genders}
          renderItem={({ item: gender }) => (
            <TouchableOpacity style={{ marginRight: 20 }}>
              <GenderItem>
                <GenderText>{gender.name}</GenderText>
              </GenderItem>
            </TouchableOpacity>
          )}
        />
      </Gender>
      <PlayingMusic />
    </Container>
  );
};

export default Home;
