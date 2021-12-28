import * as React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import palette from 'src/styles/palette';
import {AppText} from './common';

const Search: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <AppText style={styles.title}>
        Hello <AppText style={styles.markedTitle}>Search!</AppText>
      </AppText>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').height,
    width: '100%',
    alignItems: 'center',
    backgroundColor: palette.primary,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    paddingTop: 80,
    color: palette.black,
  },
  markedTitle: {
    fontSize: 36,
    textAlign: 'center',
    color: palette.white,
    fontWeight: '700',
  },
});
