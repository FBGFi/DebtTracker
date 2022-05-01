import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Home } from './screens';


const App: React.FunctionComponent = () => {
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
