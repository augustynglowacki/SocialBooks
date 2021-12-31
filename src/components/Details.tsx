import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Book} from 'src/models';
import {palette} from 'src/styles';
import {BookComponent} from 'src/components/books';
import {AppText, Container} from 'src/components/common';

interface Props {
  book: Book | undefined;
  goBack: () => void;
}

export const Details: React.FC<Props> = ({book, goBack}) => {
  if (!book) return null;
  return (
    <Container style={styles.wrapper} flexStart>
      <BookComponent book={book} style={{marginVertical: 24}} shadowColor={palette.secondary} variant="details" />
      <AppText style={styles.title} fontWeight="bold">
        {book.volumeInfo.title}
      </AppText>
      <View style={styles.authorWrapper}>
        {book.volumeInfo.authors.slice(0, 2).map(item => (
          <AppText key={item} style={styles.author}>
            {item}
          </AppText>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  authorWrapper: {
    flexDirection: 'row',
  },
  title: {
    paddingTop: 30,
    fontSize: 24,
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  author: {
    paddingTop: 20,
    fontSize: 16,
    letterSpacing: -0.8,
    textAlign: 'center',
    marginHorizontal: 12,
    opacity: 0.8,
  },
});
