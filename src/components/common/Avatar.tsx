import React from 'react';
import {FlexStyle, Image, Pressable, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
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
  style?: StyleProp<FlexStyle | ViewStyle | TextStyle>;
  onPress?: () => void;
  fontSize?: number;
}

export const Avatar: React.FC<Props> = ({
  color,
  isSmall,
  size = 100,
  editable,
  source,
  name,
  onPress,
  style,
  fontSize,
}) => {
  const {
    colors: {background, text},
  } = useTheme();
  return (
    <Pressable onPress={onPress} style={style}>
      {!source && !!name ? (
        <AvatarPaper.Text
          size={size}
          label={name?.slice(0, 2).toUpperCase()}
          color={text}
          labelStyle={[{fontFamily: 'RobotoMono-Bold'}, !!fontSize && {fontSize}]}
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
