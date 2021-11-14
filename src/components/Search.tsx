import * as React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import palette from 'src/styles/palette';

const Search: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        Hello <Text style={styles.markedTitle}>Search!</Text>
      </Text>
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
