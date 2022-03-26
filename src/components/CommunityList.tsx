import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ListRenderItem, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {AnyScreenProp, ErrorType, Route} from 'src/constants';
import {getBookShadowColor} from 'src/helpers/getBookShadowColor';
import {CommunityFeedData, Favorite, Review} from 'src/models';
import {userSelector} from 'src/redux/user/userSlice';
import {palette} from 'src/styles';
import {BookComponent} from './books';
import {AppText, Avatar} from './common';
import {ReviewComponent} from './reviews';

interface Props {
  data: CommunityFeedData;
  error?: ErrorType | string | undefined | null;
  loading?: boolean;
  horizontal?: true;
  style?: StyleProp<ViewStyle>;
}

const isReview = (item: Review | Favorite): item is Review => (item as Review).reviewTitle !== undefined;

export const CommunityList: React.FC<Props> = ({data, horizontal = false, error, loading}) => {
  const {navigate} = useNavigation<AnyScreenProp>();
  const {allUsers} = useSelector(userSelector);
  const getDisplayName = (id: string) => allUsers.find(item => item.userId === id)?.displayName;

  const renderItem: ListRenderItem<Review | Favorite> = ({item, index}) => {
    return (
      <View style={styles.margin}>
        {!!item.createdBy && (
          <View style={styles.flex}>
            <View>
              <Avatar name={getDisplayName(item.createdBy)} size={36} color={palette.primary} />
            </View>
            <AppText fontWeight="bold" style={styles.author}>
              {getDisplayName(item.createdBy)}
            </AppText>
            <AppText variant="p" style={styles.createdBy}>
              {isReview(item) ? 'zrecenzował:' : 'lubi to:'}
            </AppText>
          </View>
        )}
        {isReview(item) && item.book && (
          <ReviewComponent
            reviewData={item}
            style={styles.mt}
            shadowColor={getBookShadowColor(index)}
            onComponentPress={() => navigate(Route.REVIEW_DETAILS, {reviewData: item, id: item.id})}
          />
        )}
        {!isReview(item) && item.book && (
          <BookComponent
            book={item.book}
            style={[styles.mt, styles.ml]}
            shadowColor={getBookShadowColor(index)}
            onPress={() => navigate(Route.DETAILS, {book: item.book, id: item.book.id})}
          />
        )}
      </View>
    );
  };
  if (!data.length) {
    return null;
  }
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={horizontal}
        maxToRenderPerBatch={10}
        initialNumToRender={4}
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        contentInset={{bottom: 18}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: -14,
    alignSelf: 'center',
    marginVertical: -18,
    flex: 1,
  },
  mt: {
    marginTop: 18,
  },
  ml: {
    marginLeft: 15,
  },
  margin: {
    marginBottom: 16,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    marginLeft: 4,
  },
  createdBy: {
    paddingHorizontal: 3,
    marginRight: 8,
    lineHeight: 36,
  },
  author: {
    marginLeft: 6,
    paddingTop: 35,
    paddingHorizontal: 3,
    fontSize: 20,
    lineHeight: 36,
  },
});
