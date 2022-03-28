import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ListRenderItem, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {AnyScreenProp, ErrorType, Route} from 'src/constants';
import {getBookShadowColor} from 'src/helpers/getBookShadowColor';
import {Challenge} from 'src/models';
import {userSelector} from 'src/redux/user/userSlice';
import {palette} from 'src/styles';
import {AppText, Avatar} from '../common';
import {ChallengeComponent} from './ChallengeComponent';

interface Props {
  data: Challenge[];
  error?: ErrorType | string | undefined | null;
  loading?: boolean;
  horizontal?: true;
  style?: StyleProp<ViewStyle>;
}

export const ChallengesList: React.FC<Props> = ({data, horizontal = false, error, loading}) => {
  const {navigate} = useNavigation<AnyScreenProp>();
  const {allUsers} = useSelector(userSelector);
  const getDisplayName = (id: string) => allUsers.find(item => item.userId === id)?.displayName;

  const renderItem: ListRenderItem<Challenge> = ({item, index}) => {
    return (
      <View style={styles.margin}>
        <ChallengeComponent
          challengeData={item}
          style={styles.mt}
          shadowColor={getBookShadowColor(index)}
          onComponentPress={() => navigate(Route.CHALLENGE_DETAILS, {challengeData: item})}
        />
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
    marginBottom: 12,
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
