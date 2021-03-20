import React, { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { useMusic } from '../../hooks/music'
import Cover from '../../assets/cover.jpg';
import { Ellipse, MusicPlaceholder } from '../../assets/icons'
import { Container, Content, Header, Image, Title, SubTitle, Slider, Buttons, Play, Back, ViewMusicDuration, DurationView, DurationTime } from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { millisToMinutesAndSeconds } from '../../utils/convert-millis';

const Playing: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const navigation = useNavigation();

  const { music, handleStopMusic, musicStatus, musicDuration, sound } = useMusic();

  useEffect(() => {
    setInterval(() => {
      sound.getStatusAsync().then((response: any) => {
        setCurrentTime(response.positionMillis);
      })
    }, 1000)
  }, []);

  const handleChangePositionMillis = useCallback((value) => {
    // setMusicOptions(prevState => ({
    //   ...prevState,
    //   positionMillis: value
    // }))
  }, [])

  return (
    <Container>
      <LinearGradient colors={['#45739d', '#44c68f']} style={{ height:'100%', width: '100%', }} >
        <TouchableOpacity style={{ paddingTop: 15, paddingLeft: 15, flexDirection: 'row', alignItems: 'center'}} onPress={navigation.goBack}>
          <Icon name="left" size={24} color="#FFF" />
          <Back> Voltar </Back>
        </TouchableOpacity>
        <Content>
          <Header>
            <TouchableOpacity>
              <Icon name="staro" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconFeather name="list" size={30} color="#FFF" />
            </TouchableOpacity>
          </Header>
          <Image source={MusicPlaceholder} />
          <Title>{music.filename.substring(0, 40)}</Title>
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
              <DurationTime>{millisToMinutesAndSeconds(currentTime)}</DurationTime>
              <DurationTime>{millisToMinutesAndSeconds(musicDuration)}</DurationTime>
            </DurationView>
          </ViewMusicDuration>
          <Buttons>
            <TouchableOpacity>
              <Icon name="retweet" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="stepbackward" size={35} color="#FFF" style={{ marginLeft: 25 }} />
            </TouchableOpacity>
            <Play onPress={handleStopMusic}>
              {!musicStatus && <Icon name="caretright" size={35} color="#45739D" />}
              {musicStatus && <Icon name="pause" size={35} color="#45739D" />}
            </Play>
            <TouchableOpacity>
              <Icon name="stepforward" size={35} color="#FFF" style={{ marginLeft: 25 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconFA name="random" size={24} color="#FFF" style={{ marginLeft: 25 }} />
            </TouchableOpacity>
          </Buttons>
        </Content>
      </LinearGradient>
    </Container>
  );
}

export default Playing;
