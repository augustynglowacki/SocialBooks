import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, ListRenderItem, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AnyScreenProp, ErrorType, Route} from 'src/constants';
import {getBookShadowColor} from 'src/helpers/getBookShadowColor';
import {Review} from 'src/models';
import {ReviewComponent} from './ReviewComponent';

interface Props {
  data: Review[];
  error?: ErrorType | string | undefined | null;
  loading?: boolean;
  horizontal?: true;
  style?: StyleProp<ViewStyle>;
}

export const ReviewList: React.FC<Props> = ({data, style, horizontal = false, loading, error}) => {
  const {navigate} = useNavigation<AnyScreenProp>();
  const renderItem: ListRenderItem<Review> = ({item, index}) => (
    <ReviewComponent
      reviewData={item}
      style={!horizontal && styles.listComponent}
      shadowColor={getBookShadowColor(index)}
      onPress={() => navigate(Route.DETAILS, {book: item.book, id: item.book.id})}
    />
  );
  if (!data.length) {
    return null;
  }
  return (
    <View style={[styles.wrapper, !horizontal && {marginVertical: -18, flex: 1}]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={horizontal}
        maxToRenderPerBatch={10}
        initialNumToRender={4}
        keyExtractor={(item, index) => item.id.toString()}
        contentContainerStyle={[horizontal && {maxHeight: 210, height: 210}]}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        persistentScrollbar={true}
        contentInset={{bottom: !horizontal ? 18 : 0}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    marginHorizontal: -14,
    alignSelf: 'center',
  },
  listComponent: {
    marginVertical: 18,
  },
});
