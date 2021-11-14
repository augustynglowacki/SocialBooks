import React from 'react';
import {StyleSheet} from 'react-native';
import palette from 'src/styles/palette';
import Icon from 'src/components/Icon';

const TabIcon = (focused: boolean, name: string, size?: number) => {
  if (!size) {
    size = 26;
  }
  const outline = name + '-outline';
  if (focused) {
    return (
      <Icon
        style={styles.scale}
        color={palette.primary}
        name={name}
        size={size}
      />
    );
  }
  return <Icon color={palette.white} name={outline} size={size} />;
};

export default TabIcon;

const styles = StyleSheet.create({
  scale: {
    transform: [{scale: 1.1}],
  },
});
