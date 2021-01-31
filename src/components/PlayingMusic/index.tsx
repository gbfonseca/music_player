import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useMusic } from '../../hooks/music';
import { ActualMusic, MusicName, MusicInfo } from './styles';

interface MusicProps {
  name: string;
  artist: string;
  id: number;
}

const PlayingMusic: React.FC = () => {

  const [playingMusic, setPlayingMusic] = useState<MusicProps>({} as MusicProps);

  const { music } = useMusic();

  useEffect(() => {
    setPlayingMusic(music);
  }, [])

  return (
    <>
      {music && (
        <LinearGradient colors={['#45739d', '#44c68f']} style={{height: 50, flexDirection: 'row',  width: '100%',paddingHorizontal: 12, alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: 0}} >
          <ActualMusic>
            <TouchableOpacity>
              <Icon name="caretright" size={24} color="#151515" />
            </TouchableOpacity>
            <View style={{ marginLeft: 21 }}>
              <MusicName>{music.name}</MusicName>
              <MusicInfo>{music.artist}</MusicInfo>
            </View>
          </ActualMusic>
          <TouchableOpacity>
            <Icon name="stepforward" size={24} color="#151515" />
          </TouchableOpacity>
        </LinearGradient>
      )}
    </>
  );
}

export default PlayingMusic;