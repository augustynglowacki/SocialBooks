import * as React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import palette from 'src/styles/palette';

const Home: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        Hello <Text style={styles.markedTitle}>Demo!</Text>
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').height,
    width: '100%',
    alignItems: 'center',
    backgroundColor: palette.white,
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
    color: palette.primary,
    fontWeight: '700',
  },
});
