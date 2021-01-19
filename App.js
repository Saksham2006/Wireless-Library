import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Header from 'react-native-elements';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TransactionScreen from './Screens/TransactionScreen';
import SearchScreen from './Screens/SearchScreen';
import IssueScreen from './Screens/IssueScreen';
import ReturnScreen from './Screens/ReturnScreen';
import LoginScreen from './Screens/LoginScreen';

export default class App extends React.Component {
  render() {
    return( 
      <AppContainer />
      );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Transaction: { screen: TransactionScreen },
    Search: { screen: SearchScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName == 'Transaction') {
          return (
            <Image
              source={require('transaction.PNG')}
              style={{ width: 30, height: 30 }}
            />
          );
        } else if (routeName == 'Search') {
          return (
            <Image
              source={require('search.jpg')}
              style={{ width: 30, height: 30 }}
            />
          );
        }
      },
    }),
  }
);
const SwitchNavigator = createSwitchNavigator({
  Login:{screen: LoginScreen},
  TabNavigator:{screen: TabNavigator}
});
const AppContainer = createAppContainer(SwitchNavigator);
