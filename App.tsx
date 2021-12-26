import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';
import palette from 'src/styles/palette';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={palette.black} />
        <HomeNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
