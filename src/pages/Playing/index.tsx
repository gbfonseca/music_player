import React, { useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';

import { MusicFile } from '~/models/MusicFile';

import {
  Container,
  Content,
  Header,
  Image,
  Title,
  SubTitle,
  Slider,
  Buttons,
  Play,
  Back,
  ViewMusicDuration,
  DurationView,
  DurationTime,
} from './styles';

import { Ellipse, MusicPlaceholder } from '../../assets/icons';
import { useMusic } from '../../hooks/music';
import { millisToMinutesAndSeconds } from '../../utils/convert-millis';

const Playing: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const navigation = useNavigation();

  const {
    music,
    handleStopMusic,
    musicStatus,
    musicDuration,
    sound,
    setMusicOptions,
    musicsFavorites,
    setMusicsFavorites,
  } = useMusic();

  useEffect(() => {
    setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sound.getStatusAsync().then((response: any) => {
        setCurrentTime(response.positionMillis);
      });
    }, 1000);
  }, [sound]);

  const handleChangePositionMillis = useCallback(
    (value) => {
      setMusicOptions((prevState: MusicFile) => ({
        ...prevState,
        positionMillis: value,
      }));
    },
    [setMusicOptions],
  );

  const handleFavoriteMusic = useCallback(
    async (selectedMusic) => {
      let newArr;
      if (!musicsFavorites.includes(JSON.stringify(selectedMusic))) {
        newArr = [...musicsFavorites, JSON.stringify(selectedMusic)];
      } else {
        newArr = musicsFavorites.filter(
          (a) => a !== JSON.stringify(selectedMusic),
        );
      }
      setMusicsFavorites(newArr);
      await AsyncStorage.setItem(
        '@RNMusicPlayer: favorites',
        JSON.stringify(newArr),
      );
    },
    [musicsFavorites, setMusicsFavorites],
  );

  return (
    <Container>
      <LinearGradient
        colors={['#45739d', '#44c68f']}
        style={{ height: '100%', width: '100%' }}
      >
        <TouchableOpacity
          style={{
            paddingTop: 15,
            paddingLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={navigation.goBack}
        >
          <Icon name="left" size={24} color="#FFF" />
          <Back> Voltar </Back>
        </TouchableOpacity>
        <Content>
          <Header>
            <TouchableOpacity onPress={() => handleFavoriteMusic(music)}>
              <Icon
                name={
                  musicsFavorites?.includes(JSON.stringify(music))
                    ? 'star'
                    : 'staro'
                }
                size={30}
                color="#FFF"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconFeather name="list" size={30} color="#FFF" />
            </TouchableOpacity>
          </Header>
          <Image
            source={music.coverUrl ? { uri: music.coverUrl } : MusicPlaceholder}
          />
          <Title>
            {music.filename
              .replace('.mp3', '')
              .replace(/^[0-9]*/gm, '')
              .replace('- ', '')}
          </Title>
          <SubTitle>Autor desconhecido</SubTitle>
          <ViewMusicDuration>
            <Slider
              minimumTrackTintColor="#45739D"
              maximumTrackTintColor="#FFF"
              thumbTintColor="#FFF"
              thumbImage={Ellipse}
              minimumValue={0}
              maximumValue={musicDuration}
              value={currentTime}
              onValueChange={(value) => handleChangePositionMillis(value)}
            />
            <DurationView>
              <DurationTime>
                {millisToMinutesAndSeconds(currentTime)}
              </DurationTime>
              <DurationTime>
                {millisToMinutesAndSeconds(musicDuration)}
              </DurationTime>
            </DurationView>
          </ViewMusicDuration>
          <Buttons>
            <TouchableOpacity>
              <Icon name="retweet" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="stepbackward"
                size={35}
                color="#FFF"
                style={{ marginLeft: 25 }}
              />
            </TouchableOpacity>
            <Play onPress={handleStopMusic}>
              {!musicStatus && (
                <Icon name="caretright" size={35} color="#45739D" />
              )}
              {musicStatus && <Icon name="pause" size={35} color="#45739D" />}
            </Play>
            <TouchableOpacity>
              <Icon
                name="stepforward"
                size={35}
                color="#FFF"
                style={{ marginLeft: 25 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconFA
                name="random"
                size={24}
                color="#FFF"
                style={{ marginLeft: 25 }}
              />
            </TouchableOpacity>
          </Buttons>
        </Content>
      </LinearGradient>
    </Container>
  );
};

export default Playing;
