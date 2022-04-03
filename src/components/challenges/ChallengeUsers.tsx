import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleProp, StyleSheet, TextStyle, useColorScheme, View} from 'react-native';
import {List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {userSelector} from 'src/redux/user/userSlice';
import {palette} from 'src/styles';
import {AppText, Avatar, Icon} from '../common';

interface Props {
  takingPart: string[] | undefined;
  completed: string[] | undefined;
}

export const ChallengeUsers: React.FC<Props> = ({takingPart, completed}) => {
  const [expanded, setExpanded] = React.useState(true);
  const {allUsers} = useSelector(userSelector);
  const getDisplayName = (id: string) => allUsers.find(item => item.userId === id)?.displayName;
  const scheme = useColorScheme();
  const {
    colors: {background, text},
  } = useTheme();

  const baseTextStyle: StyleProp<TextStyle> = {
    fontSize: 16,
    fontFamily: `RobotoMono-Regular`,
    color: text,
  };
  const listItemStyle: StyleProp<TextStyle> = {
    ...baseTextStyle,
    opacity: scheme === 'dark' ? 0.9 : 0.75,
  };

  const handlePress = () => setExpanded(curr => !curr);
  return (
    <>
      <AppText variant="p" style={styles.title}>
        Informacje o wyzwaniu:
      </AppText>
      <List.Section>
        <List.Accordion
          title="Biorą udział:"
          left={() => (
            <>
              <Avatar
                name={takingPart?.length.toString()}
                size={34}
                fontSize={22}
                color={palette.primary}
                style={styles.usersCount}
              />
              <Icon name="ios-people" size={36} style={[{color: palette.primary}]} />
            </>
          )}
          style={[listItemStyle, {backgroundColor: background}]}
          titleStyle={baseTextStyle}>
          {takingPart?.map(item => (
            <View style={[styles.flex, styles.listSpacing]} key={item}>
              <View>
                <Avatar name={getDisplayName(item)} size={28} color={palette.primary} />
              </View>
              <AppText variant="p" style={[styles.author, listItemStyle]}>
                {getDisplayName(item)}
              </AppText>
            </View>
          ))}
        </List.Accordion>
        <List.Accordion
          title="Ukończyli:"
          expanded={expanded}
          onPress={handlePress}
          style={[listItemStyle, {backgroundColor: background}]}
          titleStyle={baseTextStyle}
          left={() => (
            <>
              <Avatar
                name={completed?.length.toString()}
                size={34}
                color={palette.green}
                style={styles.usersCount}
                fontSize={22}
              />
              <Icon name="ios-checkbox" size={36} style={[{color: palette.green}]} />
            </>
          )}>
          {completed?.map(item => (
            <View style={[styles.flex, styles.listSpacing]} key={item}>
              <View>
                <Avatar name={getDisplayName(item)} size={28} color={palette.green} />
              </View>
              <AppText variant="p" style={[styles.author, listItemStyle]}>
                {getDisplayName(item)}
              </AppText>
            </View>
          ))}
        </List.Accordion>
      </List.Section>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'},
  title: {
    paddingTop: 30,
  },
  listSpacing: {
    marginBottom: 8,
  },
  author: {
    marginLeft: 12,
    lineHeight: 28,
  },
  usersCount: {
    marginRight: 8,
  },
});
