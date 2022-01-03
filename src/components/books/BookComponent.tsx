import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlexStyle,
  ImageBackground,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Book} from 'src/models';
import {BORDER_RADIUS, BOX_SHADOW, palette} from 'src/styles';
import {AppText} from '../common/AppText';
interface Props {
  book: Book;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  variant?: 'thumbnail' | 'details';
}

export const BookComponent: React.FC<Props> = ({
  book,
  disabled,
  onPress,
  style,
  variant = 'thumbnail',
  shadowColor = palette.primary,
}) => {
  const isThumbnail = variant === 'thumbnail';
  const [imageLoading, setImageLoading] = useState(false);
  const toggleImageLoading = () => setImageLoading(curr => !curr);
  const {
    colors: {background, text},
  } = useTheme();
  const wrapperStyle: StyleProp<ViewStyle> = {
    height: isThumbnail ? 150 : 270,
    width: isThumbnail ? 100 : 180,
    shadowOpacity: 0.2,
    marginHorizontal: 8,
  };
  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: !book.volumeInfo.imageLinks?.thumbnail ? 'flex-start' : 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: background,
    borderRadius: BORDER_RADIUS,
    height: isThumbnail ? 150 : 270,
    width: isThumbnail ? 100 : 180,
    borderWidth: isThumbnail ? 3 : 4,
    borderColor: text,
  };
  const titleAuthorWrapper: StyleProp<ViewStyle> = {
    height: '100%',
    justifyContent: isThumbnail ? 'flex-start' : 'center',
    alignItems: 'center',
  };
  const titleStyle: StyleProp<TextStyle> = {
    fontSize: isThumbnail ? 11 : 17,
    marginTop: isThumbnail ? 15 : 30,
    letterSpacing: -1,
    color: text,
    textAlign: 'center',
  };
  const authorStyle: StyleProp<TextStyle> = {
    marginTop: isThumbnail ? 25 : 0,
    fontSize: isThumbnail ? 11 : 18,
    letterSpacing: -1,
    color: text,
  };

  const shadowStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: shadowColor,
    width: '100%',
    maxWidth: isThumbnail ? 96 : 180,
    height: isThumbnail ? 146 : 270,
    borderRadius: BORDER_RADIUS,
  };
  const imageStyle: StyleProp<ImageStyle> = {
    width: '100%',
    height: '100%',
    backgroundColor: text,
    zIndex: 40,
  };
  const linearGradient: StyleProp<ViewStyle> = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 0,
  };
  if (!book) return null;

  const getBookCover = () => {
    if (!!book.volumeInfo.imageLinks?.thumbnail) {
      return (
        <View style={{height: '100%', width: '100%'}}>
          <ImageBackground
            source={{
              uri: book.volumeInfo.imageLinks?.thumbnail?.replace('http', 'https'),
            }}
            onLoadStart={toggleImageLoading}
            onLoadEnd={toggleImageLoading}
            style={imageStyle}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return (
        <View style={titleAuthorWrapper}>
          <AppText style={authorStyle} fontWeight="bold">
            {book.volumeInfo.authors?.[0]}
          </AppText>
          <AppText style={titleStyle} fontWeight="bold">
            {book.volumeInfo.title}
          </AppText>
        </View>
      );
    }
  };

  const Gradient = () => (
    <LinearGradient
      colors={[
        'rgba(0,0,0,0)',
        'rgba(0,0,0,0)',
        'rgba(0,0,0,0.02)',
        'rgba(0,0,0,0.05)',
        'rgba(0,0,0,0.02)',
        'rgba(0,0,0,0)',
        'rgba(0,0,0,0)',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={linearGradient}
    />
  );

  return (
    <View style={[BOX_SHADOW, wrapperStyle, style, imageLoading && {display: 'none'}]}>
      {isThumbnail ? (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
          <View style={shadowStyle}></View>
          <View style={buttonStyle}>{getBookCover()}</View>
        </TouchableOpacity>
      ) : (
        <>
          <View style={shadowStyle}></View>
          <View style={buttonStyle}>
            {getBookCover()}
            <Gradient />
          </View>
        </>
      )}
    </View>
  );
};
