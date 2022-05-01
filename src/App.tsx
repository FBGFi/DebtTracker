import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Home } from './screens';


const App: React.FunctionComponent = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  if(!appLoaded) SplashScreen.show();

  // TODO load persistent storage
  const prepareApp = () => {
    setTimeout(() => {
      SplashScreen.hide();
      setAppLoaded(true);
    }, 5000);
  }

  useEffect(() => {
    prepareApp();
  }, []);

  return (
    <View>
      <Text>Debt Tracker</Text>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;
