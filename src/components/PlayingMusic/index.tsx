import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFA from 'react-native-vector-icons/FontAwesome';

import { ActualMusic, MusicName } from './styles';

import { useMusic } from '../../hooks/music';

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
}

const PlayingMusic: React.FC = () => {
  const navigation = useNavigation();

  const [playingMusic, setPlayingMusic] = useState<MusicProps>(
    {} as MusicProps,
  );

  const { music, handleStopMusic, musicStatus } = useMusic();

  useEffect(() => {
    setPlayingMusic(music);
  }, [music]);

  return (
    <TouchableOpacity
      style={{ width: '100%' }}
      onPress={() =>
        navigation.navigate('Playing', {
          screen: 'Playing',
        })
      }
    >
      {music.filename && (
        <LinearGradient
          colors={['#45739d', '#44c68f']}
          style={{
            height: 50,
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ActualMusic>
            <TouchableOpacity onPress={handleStopMusic}>
              {!musicStatus && (
                <Icon name="caretright" size={24} color="#151515" />
              )}
              {musicStatus && <IconFA name="pause" size={24} color="#151515" />}
            </TouchableOpacity>
            <MusicName>
              {music.filename
                .replace('.mp3', '')
                .replace(/^[0-9]*/gm, '')
                .replace('- ', '')}
            </MusicName>
            {/* <MusicInfo>Anyone</MusicInfo> */}
          </ActualMusic>
          <TouchableOpacity style={{ marginRight: 0, flex: 1 }}>
            <Icon name="stepforward" size={24} color="#151515" />
          </TouchableOpacity>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default PlayingMusic;
