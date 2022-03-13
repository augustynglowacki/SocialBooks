import React from 'react';
import {Image, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {palette} from 'src/styles';
import {Icon} from './Icon';
import {Avatar as AvatarPaper} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
interface Props {
  source?: string;
  isSmall?: boolean;
  editable?: boolean;
  name?: string;
  color?: string;
  size?: number;
  onPress?: () => void;
}

export const Avatar: React.FC<Props> = ({color, isSmall, size = 100, editable, source, name, onPress}) => {
  const {
    colors: {background, text},
  } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) =>
        onPress && {
          opacity: pressed ? 0.5 : 1,
        }
      }>
      {!source && !!name ? (
        <AvatarPaper.Text
          size={size}
          label={name?.slice(0, 2).toUpperCase()}
          color={text}
          labelStyle={{fontFamily: 'RobotoMono-Bold'}}
          style={{backgroundColor: color ?? background, position: 'relative'}}>
          {' '}
        </AvatarPaper.Text>
      ) : (
        <Image
          source={{
            uri: source ?? null,
          }}
          style={[styles.avatar, isSmall && styles.small]}
        />
      )}

      {!!editable && (
        <TouchableOpacity onPress={onPress} style={styles.icon}>
          <Icon name="edit" size={20} color={palette.black} />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  small: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  icon: {
    position: 'absolute',
    right: 0,
    width: 25,
    height: 25,
    backgroundColor: palette.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
