import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { useMusic } from '../../hooks/music';
import { Container, Header, Title, Button, ButtonText, RecentlyPlayed, SubTitle, MusicRecently, MostPlayed, MusicMostPlay, Gender, GenderItem, GenderText, Play, ImageMusic } from './styles';
import { PlayingMusic } from '../../components';
import CoverImage from '../../assets/cover.jpg';

interface Music {
  name: string;
  artist: string;
  id: number;
}

const musics = [
  {
    id: 1,
    name: 'Mad love',
    artist: 'Mabel'
  },
  {
    id: 2,
    name: 'Se eu largar o Freio',
    artist: 'Péricles'
  },
  {
    id: 3,
    name: 'Mad love',
    artist: 'Mabel'
  },
  {
    id: 4,
    name: 'Mad love',
    artist: 'Mabel'
  },
  {
    id: 5,
    name: 'Mad love',
    artist: 'Mabel'
  },
  {
    id: 6,
    name: 'Mad love',
    artist: 'Mabel'
  },
  {
    id: 7,
    name: 'Mad love',
    artist: 'Mabel'
  },
  {
    id: 8,
    name: 'Mad love',
    artist: 'Mabel'
  },
  {
    id: 9,
    name: 'Mad love',
    artist: 'Mabel'
  },
  {
    id: 10,
    name: 'Mad love',
    artist: 'Mabel'
  },
]

const genders = [
  {
    id: 1,
    name: 'Pagode'
  },
  {
    id: 2,
    name: 'Rock'
  },
  {
    id: 3,
    name: 'Pop'
  },
  {
    id: 4,
    name: 'MPB'
  },
  {
    id: 5,
    name: 'Jazz'
  },
  {
    id: 6,
    name: 'Funk'
  },
  {
    id: 7,
    name: 'Samba'
  },
]

const Home: React.FC = () => {

  const [selectMusic, setSelectMusic] = useState<Music>({} as Music);

  const { handleSetMusic } = useMusic();

  const handleSelectMusic = useCallback((music) => {
    handleSetMusic(music);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Músicas</Title>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LinearGradient colors={['#45739d', '#44c68f']} style={{height: 50, borderRadius: 100, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center'}} >
              <Button>
                <ButtonText>Adicionar pasta</ButtonText>
              </Button>
            </LinearGradient>
            <TouchableOpacity>
              <Icon name="settings" size={24} color="#FFF" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
        </View>
      </Header>
      <RecentlyPlayed>
        <SubTitle>Tocadas Recentemente</SubTitle>
        <FlatList
          horizontal={true}
          keyExtractor={music => music.id.toString()}
          data={musics}
          renderItem={({item: music}) => (
            <TouchableOpacity style={{  marginRight: 20}} onPress={() => handleSelectMusic(music)}>
              <MusicRecently>
                <ImageMusic source={CoverImage} />
                <Play>
                    <IconEntypo name="controller-play" size={21} />
                </Play>
              </MusicRecently>
            </TouchableOpacity>
          )}
        />
      </RecentlyPlayed>
      <MostPlayed>
        <SubTitle>As mais tocadas</SubTitle>
        <FlatList
          horizontal={true}
          keyExtractor={music => music.id.toString()}
          data={musics}
          renderItem={({item: music}) => (
            <TouchableOpacity style={{  marginRight: 20}} onPress={() => handleSelectMusic(music)}>
              <MusicMostPlay>
                <ImageMusic source={CoverImage} />
                <Play>
                  <IconEntypo name="controller-play" size={21} />
                </Play>
              </MusicMostPlay>
            </TouchableOpacity>
          )}
        />
      </MostPlayed>
      <Gender>
        <SubTitle>Gênero</SubTitle>
        <FlatList
          horizontal={true}
          keyExtractor={gender => gender.id.toString()}
          data={genders}
          renderItem={({item: gender}) => (
            <TouchableOpacity style={{  marginRight: 20}}>
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
}

export default Home;