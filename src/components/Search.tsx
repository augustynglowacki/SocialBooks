import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {palette} from 'src/styles';
import {AppButton, AppText, Container, Input} from 'src/components/common';
import {useTranslation} from 'react-i18next';
import useDebounce from 'src/hooks/useDebounce';
import {useGetSearchedBooksQuery} from 'src/services/books';
import {BookList} from './books';
import {Picker} from '@react-native-picker/picker';
import {AppModal} from './common/AppModal';
import {QueryFilters} from 'src/services/queryFIlters';

export const Search: React.FC = () => {
  const {t} = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(curr => !curr);
  };
  const [selectedQuery, setSelectedQuery] = useState<QueryFilters>(QueryFilters.TITLE);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {data, isLoading, error, isError} = useGetSearchedBooksQuery(
    {query: debouncedSearchTerm, queryType: selectedQuery},
    {
      skip: searchTerm.length < 3,
    },
  );

  if (isError && !!error && !('status' in error)) {
    <AppText>Network error</AppText>;
  }
  return (
    <Container style={styles.wrapper} withKeyboard>
      <View>
        <AppText style={styles.title} variant="h1">
          Type to{' '}
          <AppText variant="h1" style={styles.markedTitle}>
            Search!
          </AppText>
        </AppText>
        <Input label={t('search')} value={searchTerm} onChangeText={setSearchTerm} autoFocus />
        {!!data && <BookList title={t('books')} data={data} error={error} loading={isLoading} />}
        <AppModal modalVisible={modalVisible} toggleModal={toggleModal}>
          <Picker selectedValue={selectedQuery} onValueChange={item => setSelectedQuery(item)}>
            {Object.values(QueryFilters).map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </AppModal>
      </View>
      <AppButton label="Change Search Type" style={{marginVertical: 24}} onPress={toggleModal} />
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
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
