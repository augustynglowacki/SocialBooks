import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from 'src/store';
import auth from '@react-native-firebase/auth';
import { AppStatusBar } from 'src/components/common';

const App: React.FC = () => {
  // auth()
  //   .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  //   .then(() => {
  //     console.log('User account created & signed in!');
  //   })
  //   .catch(error => {
  //     if (error.code === 'auth/email-already-in-use') {
  //       console.log('That email address is already in use!');
  //     }

  //     if (error.code === 'auth/invalid-email') {
  //       console.log('That email address is invalid!');
  //     }

  //     console.error(error);
  //   });
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <AppStatusBar />
          <HomeNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
