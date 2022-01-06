import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlexStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {BORDER_RADIUS, BOX_SHADOW, palette} from 'src/styles';
import {AppText} from './AppText';

export interface Stats {
  label: string;
  count: number;
}
interface Props {
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  paddingVal?: number;
  stats: Stats[];
}

export const InfoBox: React.FC<Props> = ({style, shadowColor = palette.primary, stats}) => {
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
    height: 80,
    minWidth: '90%',
    width: '90%',
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
    left: 10,
    top: 15,
    backgroundColor: shadowColor,
    width: '100%',
    maxWidth: '90%',
    height: 75,
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
