import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, ListRenderItem, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {AnyScreenProp, ErrorType, Route} from 'src/constants';
import {getBookShadowColor} from 'src/helpers/getBookShadowColor';
import {Review} from 'src/models';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import {userSelector} from 'src/redux/user/userSlice';
import {palette} from 'src/styles';
import {AppText, Avatar} from '../common';
import {ReviewComponent} from './ReviewComponent';

interface Props {
  data: Review[];
  error?: ErrorType | string | undefined | null;
  loading?: boolean;
  horizontal?: true;
  style?: StyleProp<ViewStyle>;
  community?: boolean;
}

export const ReviewList: React.FC<Props> = ({data, style, horizontal = false, loading, error, community = false}) => {
  const {navigate} = useNavigation<AnyScreenProp>();
  const {
    user: {userName},
    allUsers,
  } = useSelector(userSelector);
  const {reviews, following} = useSelector(collectionsSelector);
  //   const followingInitialState = following.find(item => item === reviewData.createdBy);
  const getDisplayName = (id: string) => allUsers.find(item => item.userId === id)?.displayName;

  const renderItem: ListRenderItem<Review> = ({item, index}) => {
    if (!community) {
      return (
        <ReviewComponent
          reviewData={item}
          style={!horizontal && styles.listComponent}
          shadowColor={getBookShadowColor(index)}
          onComponentPress={() => navigate(Route.REVIEW_DETAILS, {reviewData: item, id: item.id})}
        />
      );
    }
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
            <AppText variant="p" style={styles.createdBy}></AppText>
          </View>
        )}
        <ReviewComponent
          reviewData={item}
          style={!horizontal && styles.listComponent}
          shadowColor={getBookShadowColor(index)}
          onComponentPress={() => navigate(Route.REVIEW_DETAILS, {reviewData: item, id: item.id})}
        />
      </View>
    );
  };
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
  margin: {
    marginBottom: 16,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
  },
  createdBy: {
    paddingTop: 30,
    paddingHorizontal: 3,
    marginRight: 8,
    lineHeight: 36,
  },
  author: {
    marginLeft: 6,
    paddingTop: 30,
    paddingHorizontal: 3,
    fontSize: 20,
    lineHeight: 36,
  },
});
