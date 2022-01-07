import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AnyScreenProp, ErrorType, Route} from 'src/constants';
import {getBookShadowColor} from 'src/helpers/getBookShadowColor';
import {Review} from 'src/models';
import {ReviewComponent} from './ReviewComponent';

interface Props {
  data: Review[];
  error?: ErrorType | string | undefined | null;
  loading: boolean;
}

export const ReviewList: React.FC<Props> = ({data, error}) => {
  const {navigate} = useNavigation<AnyScreenProp>();
  const renderItem: ListRenderItem<Review> = ({item, index}) => (
    <ReviewComponent
      reviewData={item}
      shadowColor={getBookShadowColor(index)}
      //   onPress={() => navigate(Route.DETAILS, {book: item, id: item.id})}
    />
  );
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
        keyExtractor={(item, index) => item.id.toString()}
        contentContainerStyle={{maxHeight: 210, height: 210}}
        persistentScrollbar={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    flex: 1,
    marginHorizontal: -14,
  },
});
