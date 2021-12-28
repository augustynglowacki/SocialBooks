import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar, View} from 'react-native';
import palette from 'src/styles/palette';
import {Provider} from 'react-redux';
import store from 'src/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar backgroundColor={palette.black} />
          <HomeNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
