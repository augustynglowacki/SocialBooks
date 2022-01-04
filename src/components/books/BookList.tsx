import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AnyScreenProp, ErrorType, Route} from 'src/constants';
import {getBookShadowColor} from 'src/helpers/getBookShadowColor';
import {Book} from 'src/models';
import {BookComponent} from '.';

interface Props {
  title: string;
  data: Book[];
  error?: ErrorType;
  loading: boolean;
}

export const BookList: React.FC<Props> = ({data, error}) => {
  const {navigate} = useNavigation<AnyScreenProp>();
  const renderItem: ListRenderItem<Book> = ({item, index}) => (
    <BookComponent
      book={item}
      shadowColor={getBookShadowColor(index)}
      onPress={() => navigate(Route.DETAILS, {book: item, id: item.id})}
    />
  );
  //   if (error) {
  //     return <ErrorWrapper error={error} loading={false} />;
  //   }
  if (!data.length) {
    return null;
  }
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        maxToRenderPerBatch={10}
        initialNumToRender={4}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{maxHeight: 180, height: 180}}
        persistentScrollbar={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    flex: 1,
  },
});
