import React from 'react';
import {ListRenderItem, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ErrorType} from 'src/constants';
import {getBookShadowColor} from 'src/helpers/getBookShadowColor';
import {Book} from 'src/models';
import {BookComponent} from '.';
import {Container} from '../common';

interface Props {
  title: string;
  data: Book[];
  error?: ErrorType;
  loading: boolean;
}

export const BookList: React.FC<Props> = ({data, error}) => {
  const renderItem: ListRenderItem<Book> = ({item, index}) => (
    <BookComponent book={item} shadowColor={getBookShadowColor(index)} />
  );
  //   if (error) {
  //     return <ErrorWrapper error={error} loading={false} />;
  //   }
  if (!data.length) {
    return null;
  }
  return (
    <Container style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        maxToRenderPerBatch={10}
        initialNumToRender={4}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{maxHeight: 158}}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    position: 'relative',
  },
});
