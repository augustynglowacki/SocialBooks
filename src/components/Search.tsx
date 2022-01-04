import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {palette} from 'src/styles';
import {AppButton, AppText, Container, Input} from 'src/components/common';
import {useTranslation} from 'react-i18next';
import useDebounce from 'src/hooks/useDebounce';
import {useGetSearchedBooksQuery} from 'src/services/books';
import {useNavigation} from '@react-navigation/native';
import {SearchScreenProp} from 'src/constants';
import {BookList} from './books';
import {Picker} from '@react-native-picker/picker';
import {AppModal} from './common/AppModal';

type Filter = 'author' | 'title' | 'fulltext' | 'romance';

export const Search: React.FC = () => {
  const {t} = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(curr => !curr);
  };
  const [selectedFilter, setSelectedFilter] = useState<Filter>('title');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {data, isLoading, error, isError} = useGetSearchedBooksQuery(debouncedSearchTerm, {
    skip: searchTerm.length < 3,
  });
  console.log(data);
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
          <Picker selectedValue={selectedFilter} onValueChange={item => setSelectedFilter(item)}>
            <Picker.Item label="Author" value="author" />
            <Picker.Item label="Title" value="title" />
            <Picker.Item label="Fulltext" value="fulltext" />
            <Picker.Item label="Category" value="romance" />
          </Picker>
        </AppModal>
      </View>

      <AppButton label="Filters" style={{marginVertical: 24}} onPress={toggleModal} />
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
