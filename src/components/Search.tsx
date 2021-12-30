import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {palette} from 'src/styles';
import {AppText, Container} from 'src/components/common';

export const Search: React.FC = () => {
  return (
    <Container style={styles.wrapper} flexStart>
      <AppText style={styles.title} variant="h1">
        Hello{' '}
        <AppText variant="h1" style={styles.markedTitle}>
          Search!
        </AppText>
      </AppText>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: palette.white,
  },
  title: {
    paddingTop: 40,
  },
  markedTitle: {
    color: palette.secondary,
  },
});
