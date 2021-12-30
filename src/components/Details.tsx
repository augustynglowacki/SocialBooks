import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Book} from 'src/models';
import {palette} from 'src/styles';
import {BookComponent} from 'src/components/books';
import {Container} from 'src/components/common';

interface Props {
  book: Book | undefined;
  goBack: () => void;
}

export const Details: React.FC<Props> = ({book, goBack}) => {
  if (!book) return null;
  return (
    <Container style={styles.wrapper} flexStart>
      {!!book && <BookComponent book={book} style={{marginVertical: 24}} shadowColor={palette.secondary} />}
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: palette.white,
  },
});
