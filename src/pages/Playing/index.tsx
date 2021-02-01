import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { useMusic } from '../../hooks/music'
import Cover from '../../assets/cover.jpg';
import { Ellipse } from '../../assets/icons'
import { Container, Content, Header, Image, Title, SubTitle, Slider, Buttons, Play, Back } from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Playing: React.FC = () => {

  const navigation = useNavigation();

  const { music, handleStopMusic, musicStatus } = useMusic();

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
          <Image source={Cover} />
          <Title>{music.name}</Title>
          <SubTitle>{music.artist}</SubTitle>
          <Slider
            minimumTrackTintColor="#45739D"
            maximumTrackTintColor="#FFF"
            thumbTintColor="#FFF"
            thumbImage={Ellipse}
          />
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