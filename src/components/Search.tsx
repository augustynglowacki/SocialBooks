import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {palette} from 'src/styles';
import {AppText, Container, Input} from 'src/components/common';
import {useTranslation} from 'react-i18next';
import useDebounce from 'src/hooks/useDebounce';
import {useGetSearchedBooksQuery} from 'src/services/books';
import {useNavigation} from '@react-navigation/native';
import {SearchScreenProp} from 'src/constants';
import {BookList} from './books';

export const Search: React.FC = () => {
  const {t} = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {data, isLoading, error, isError} = useGetSearchedBooksQuery(debouncedSearchTerm, {
    skip: searchTerm.length < 3,
  });

  if (isError && !!error && !('status' in error)) {
    <AppText>Network error</AppText>;
  }
  return (
    <Container style={styles.wrapper}>
      <AppText style={styles.title} variant="h1">
        Type to{' '}
        <AppText variant="h1" style={styles.markedTitle}>
          Search!
        </AppText>
      </AppText>
      <Input label={t('search')} value={searchTerm} onChangeText={setSearchTerm} autoFocus />
      {!!data && <BookList title={t('books')} data={data} error={error} loading={isLoading} />}
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    paddingTop: 10,
    marginBottom: 30,
  },
  markedTitle: {
    color: palette.secondary,
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
  },
});
