import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, DebtHoldersScreen, DebtsScreen } from './screens';
import { DebtHoldersProvider, DebtsProvider } from "./context";

const items = [
  {
    description: "Viinaa",
    price: 666.00,
    currency: "EUR"
  },
  {
    description: "Sipsejä",
    price: 420.69,
    currency: "EUR"
  }
]

const debtHolders: any = {
  "this-is-a-debt-holder-id": {
    name: "Niko"
  }
};

const debts: any = {
  "this-is-a-debt-description": {
    items,
    debtHolders: ["this-is-a-debt-holder-id"]
  }
};

const Tab = createBottomTabNavigator();
const App: React.FunctionComponent = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  if (!appLoaded) SplashScreen.show();

  // TODO load persistent storage
  const prepareApp = () => {
    setTimeout(() => {
      SplashScreen.hide();
      setAppLoaded(true);
    }, 1000);
  }

  useEffect(() => {
    prepareApp();
  }, []);

  return (
    <DebtHoldersProvider>
      <DebtsProvider>
        <NavigationContainer>
          <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Debts" component={DebtsScreen} />
            <Tab.Screen name="Debt Holders" component={DebtHoldersScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </DebtsProvider>
    </DebtHoldersProvider>
  );
};

const styles = StyleSheet.create({
});

export default App;
