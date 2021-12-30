import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlexStyle, Image, ImageStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Book} from 'src/models';
import {BORDER_RADIUS, BOX_SHADOW, palette} from 'src/styles';
import {AppText} from '../common/AppText';
interface Props {
  book: Book;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
}

export const BookComponent: React.FC<Props> = ({book, disabled, onPress, style, shadowColor = palette.primary}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const toggleImageLoading = () => setImageLoading(curr => !curr);
  const {
    colors: {background: white, text: black},
  } = useTheme();
  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: !book.volumeInfo.imageLinks.thumbnail ? 'flex-start' : 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: white,
    borderRadius: BORDER_RADIUS,
    height: 150,
    width: 100,
    borderWidth: 4,
    borderColor: black,
  };
  const titleStyle: StyleProp<TextStyle> = {
    fontSize: 10,
    marginTop: 15,
    letterSpacing: -1,
    color: black,
    textAlign: 'center',
  };
  const authorStyle: StyleProp<TextStyle> = {
    marginTop: 15,
    fontSize: 11,
    letterSpacing: -1,
    color: black,
  };
  const wrapperStyle: StyleProp<ViewStyle> = {height: 133, maxWidth: 100};
  const shadowStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: shadowColor,
    width: '100%',
    maxWidth: 97,
    height: 147,
    borderRadius: BORDER_RADIUS,
  };
  const imageStyle: StyleProp<ImageStyle> = {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex: 40,
  };
  if (!book) return null;

  const getBookCover = () => {
    if (!!book.volumeInfo.imageLinks.thumbnail) {
      return (
        <Image
          source={{
            uri: book.volumeInfo.imageLinks.thumbnail.replace('http', 'https'),
          }}
          onLoadStart={toggleImageLoading}
          onLoadEnd={toggleImageLoading}
          style={imageStyle}
        />
      );
    } else {
      return (
        <>
          <AppText style={authorStyle} fontWeight="bold">
            {book.volumeInfo.authors[0]}
          </AppText>
          <AppText style={titleStyle} fontWeight="bold">
            {book.volumeInfo.title}
          </AppText>
        </>
      );
    }
  };

  return (
    <View style={[wrapperStyle, BOX_SHADOW, style, imageLoading && {display: 'none'}]}>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <View style={shadowStyle}></View>
        <View style={buttonStyle}>
          {getBookCover()}
          {/* <Image
            source={{
              uri: book.volumeInfo.imageLinks.thumbnail.replace('http', 'https'),
            }}
            onLoadStart={toggleImageLoading}
            onLoadEnd={toggleImageLoading}
            // source={require('src/components/common/content.jpeg')}
            style={[imageStyle]}
          /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};
