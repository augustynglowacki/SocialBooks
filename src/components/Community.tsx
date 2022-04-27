import React from 'react';
import {StyleSheet} from 'react-native';
import {palette} from 'src/styles';
import {AppText, Container} from 'src/components/common';
import {useSelector} from 'react-redux';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import Animated, {FadeIn} from 'react-native-reanimated';
import {CommunityFeedData} from 'src/models';
import {CommunityList} from './CommunityList';

interface Props {}

export const Community: React.FC<Props> = () => {
  const {reviews, following, error, loading, favorite} = useSelector(collectionsSelector);

  const isUserFollowed = (id: string) => following.some(item => item === id);
  const communityReviews = (() => reviews.filter(item => !!item.createdBy && isUserFollowed(item.createdBy)))();
  const communityFavorite = (() => favorite.filter(item => !!item.createdBy && isUserFollowed(item.createdBy)))();
  const communityFeedData: CommunityFeedData = [...communityFavorite, ...communityReviews].sort((a, b) => {
    if (a.createdDate.localeCompare(b.createdDate) === 1) return -1;
    if (a.createdDate.localeCompare(b.createdDate) === -1) return 1;
    return 0;
  });
  return (
    <Container style={styles.container} disableScroll>
      <Animated.View entering={FadeIn.springify().stiffness(15)} style={{width: '100%', flex: 1}}>
        <AppText variant="h1" style={styles.markedTitle}>
          Twoja Społeczność
        </AppText>

        {!!following.length ? (
          !!communityReviews.length ? (
            <CommunityList data={communityFeedData} error={error} loading={loading} />
          ) : (
            <AppText style={{paddingTop: 12}}>Błąd w ładowaniu danych.</AppText>
          )
        ) : (
          <>
            <AppText style={{paddingTop: 12}}>Zaobserwuj uzytkowników, aby stworzyć swoją społeczność!</AppText>
            <AppText>Mozesz to zrobic, klikając w recenzję na ekranie głównym.</AppText>
          </>
        )}
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    flex: 1,
  },
  markedTitle: {
    paddingBottom: 35,
  },
});
