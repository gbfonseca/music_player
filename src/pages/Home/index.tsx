import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Container, Header, Title, Button, ButtonText, RecentlyPlayed, SubTitle, MusicRecently, MostPlayed, MusicMostPlay, Gender, GenderItem, GenderText, Play, ImageMusic } from './styles';
import CoverImage from '../../assets/cover.jpg';

const musics = [
  {
    id: 1,
    name: 'Mad love',
    artist: 'Mabel'
  },
  {
    id: 2,
    name: 'Mad love',
    artist: 'Mabel'
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

const Home: React.FC = () => {
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
          renderItem={() => (
            <TouchableOpacity style={{  marginRight: 20}}>
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
          renderItem={() => (
            <TouchableOpacity style={{  marginRight: 20}}>
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
          keyExtractor={music => music.id.toString()}
          data={musics}
          renderItem={() => (
            <TouchableOpacity style={{  marginRight: 20}}>
              <GenderItem>
                <GenderText>POP</GenderText>
              </GenderItem>
            </TouchableOpacity>
          )}
        />
      </Gender>
    </Container>
  );
}

export default Home;