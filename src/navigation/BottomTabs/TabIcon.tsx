import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {GestureResponderEvent, StyleSheet, TouchableOpacity} from 'react-native';
import palette from 'src/styles/palette';
import Icon from 'src/components/Icon';
import Animated, {useAnimatedStyle, useSharedValue, withSequence, withTiming} from 'react-native-reanimated';

interface Props {
  onPress: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void) | undefined;
  focused: boolean;
  name: string;
  size?: number;
  tabColor: string;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
}

const TabIcon: React.FC<Props> = ({onPress, focused, name, tabColor, size = 26, setBackgroundColor}) => {
  const outline = name + '-outline';
  const scale = useSharedValue(1.15);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));
  const handleOnPress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e);
      setBackgroundColor(tabColor);
    }
    scale.value = withSequence(withTiming(1.2, {duration: 300}), withTiming(1.2, {duration: 400}));
  };

  if (focused) {
    return (
      <TouchableOpacity onPress={e => handleOnPress(e)} style={styles.container}>
        <Animated.View style={[animatedStyle]}>
          <Icon style={styles.scale} color={palette.black} name={name} size={size} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={e => handleOnPress(e)} style={styles.container}>
      <Animated.View>
        <Icon color={palette.grey} name={outline} size={size} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scale: {
    transform: [{scale: 1.15}],
  },
});
