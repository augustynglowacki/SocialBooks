import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import {Provider as PaperProvider} from 'react-native-paper';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
