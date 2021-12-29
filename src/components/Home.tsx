import * as React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import palette from 'src/styles/palette';
import {AppText} from './common';

const Home: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <AppText style={styles.title} variant="h1" fontWeight="bold">
        Hello{' '}
        <AppText variant="h1" style={styles.markedTitle} fontWeight="bold">
          MY DIGITAL
        </AppText>
      </AppText>
      <View>
        <AppText>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </AppText>
      </View>
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
    paddingTop: 80,
    color: palette.black,
  },
  markedTitle: {
    fontSize: 36,
    color: palette.primary,
    fontWeight: '700',
  },
});
