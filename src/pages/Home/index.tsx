import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { useMusic } from '../../hooks/music';
import { Container, Header, Title, Button, ButtonText, RecentlyPlayed, SubTitle, MusicRecently, MostPlayed, MusicMostPlay, Gender, GenderItem, GenderText, Play, ImageMusic } from './styles';
import { PlayingMusic } from '../../components';
import { PlayIcon, MusicPlaceholder } from '../../assets/icons'
interface Music {
  name: string;
  artist: string;
  id: number;
  path?: string;
}


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

  const { handleSetMusic, musics, handleFindMusic } = useMusic();

  const handleSelectMusic = useCallback((music) => {
    handleSetMusic(music);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Músicas</Title>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LinearGradient colors={['#45739d', '#44c68f']} style={{height: 50, borderRadius: 100, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center'}} >
              <Button onPress={handleFindMusic}>
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
                <ImageMusic source={MusicPlaceholder} />
                <Play source={PlayIcon} />
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
                <ImageMusic source={MusicPlaceholder} />
                <Play source={PlayIcon} />
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