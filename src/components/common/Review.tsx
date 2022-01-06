import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlexStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Book} from 'src/models';
import {BORDER_RADIUS, BOX_SHADOW, palette} from 'src/styles';
import {Stats} from '.';
import {AppText} from './AppText';

interface Props {
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  paddingVal?: number;
  stats: Stats[];
}

export const Review: React.FC<Props> = ({style, shadowColor = palette.primary, stats}) => {
  const {
    colors: {background, text},
  } = useTheme();

  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: background,
    borderRadius: BORDER_RADIUS,
    height: 200,
    minWidth: '100%',
    width: '100%',
    maxWidth: 400,
    borderWidth: 4,
    borderColor: text,
  };
  const labelStyle: StyleProp<TextStyle> = {
    fontSize: 18,
    letterSpacing: 0.1,
    width: '100%',
    color: text,
    textAlign: 'center',
  };
  const wrapperStyle: StyleProp<ViewStyle> = {
    height: 80,
    width: '100%',
  };
  const shadowStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    alignSelf: 'center',
    left: -10,
    top: 15,
    backgroundColor: shadowColor,
    width: '100%',
    maxWidth: '100%',
    height: 195,
    borderRadius: BORDER_RADIUS,
  };
  const infoStyle: StyleProp<ViewStyle> = {
    marginHorizontal: 28,
  };
  return (
    <View style={[wrapperStyle, BOX_SHADOW, style]}>
      <View style={shadowStyle}></View>
      <View style={buttonStyle}>
        {!!stats &&
          stats.map(item => (
            <View key={item.label + item.count} style={[infoStyle]}>
              <AppText style={labelStyle} fontWeight="bold">
                {item.label}
              </AppText>
              <AppText style={[labelStyle]} fontWeight="bold">
                {item.count}
              </AppText>
            </View>
          ))}
      </View>
    </View>
  );
};
