import React, { useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DebtHoldersScreen, DebtsScreen } from './screens';
import { StateProvider } from "./context";
import { BottomNavigation } from "./components";
import { AppTheme } from "./styles/themes";

const Tab = createBottomTabNavigator();
const App: React.FunctionComponent = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  if (!appLoaded) SplashScreen.show();

  const prepareApp = () => {
    SplashScreen.hide();
    setAppLoaded(true);
  }

  return (
    <StateProvider onStorageLoad={prepareApp}>
      <NavigationContainer theme={AppTheme}>
        <Tab.Navigator tabBar={props => <BottomNavigation {...props} />} initialRouteName='Debts'>
          <Tab.Screen name="Debts" component={DebtsScreen} />
          <Tab.Screen name="Debt Holders" component={DebtHoldersScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </StateProvider >
  );
};

const styles = StyleSheet.create({
});

export default App;
