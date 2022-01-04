import React, {useRef, useState} from 'react';
import {DefaultTheme, NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from 'src/store';
import auth from '@react-native-firebase/auth';
import {AppStatusBar} from 'src/components/common';
import {palette} from 'src/styles';
import {useColorScheme} from 'react-native';
import {Route} from 'src/constants';
import useCheckLoginStatus from 'src/hooks/useCheckLoginStatus';
//Logo inspired by https://www.svgrepo.com/svg/230344/books-book
//App design inspired by designer 'Sara' https://www.figma.com/community/file/940142152024758826/My-Digital-Bookshelf-App-%5BBravo-Studio-Tutorial%5D

const App: React.FC = () => {
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: palette.white,
      text: palette.black,
    },
  };
  const darkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: palette.black,
      text: palette.white,
    },
  };

  const scheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();
  useCheckLoginStatus();
  const [routeName, setRouteName] = useState<string | undefined>('');
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? darkTheme : lightTheme}
          ref={navigationRef}
          onReady={() => {
            setRouteName(navigationRef?.getCurrentRoute()?.name);
          }}
          onStateChange={() => {
            setRouteName(navigationRef?.getCurrentRoute()?.name);
          }}>
          <AppStatusBar variant={routeName === Route.PROFILE ? 'translucent' : 'full'} />
          <HomeNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
