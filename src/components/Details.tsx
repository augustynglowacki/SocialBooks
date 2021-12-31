import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Book} from 'src/models';
import {palette} from 'src/styles';
import {BookComponent} from 'src/components/books';
import {AppText, Container} from 'src/components/common';
import {convertDescription} from 'src/helpers/convertDescription';

interface Props {
  book: Book | undefined;
  goBack: () => void;
}

export const Details: React.FC<Props> = ({book, goBack}) => {
  if (!book) return null;
  const {volumeInfo} = book;
  return (
    <SafeAreaView>
      <Container style={styles.wrapper} flexStart>
        <BookComponent book={book} style={{marginVertical: 24}} shadowColor={palette.secondary} variant="details" />
        {volumeInfo.title && (
          <AppText style={styles.title} fontWeight="bold">
            {volumeInfo.title}
          </AppText>
        )}
        <View style={styles.authorWrapper}>
          {volumeInfo.authors &&
            volumeInfo.authors.slice(0, 2).map(item => (
              <AppText key={item} variant="subtitle" style={styles.author}>
                {item}
              </AppText>
            ))}
        </View>
        {volumeInfo.description && (
          <AppText variant="p" style={styles.paragraph}>
            {convertDescription(volumeInfo.description)}
          </AppText>
        )}
      </Container>
    </SafeAreaView>
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
    marginHorizontal: 12,
  },
  paragraph: {
    paddingTop: 50,
    paddingHorizontal: 3,
  },
});
