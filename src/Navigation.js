import React from 'react';
import PropTypes from 'prop-types';
import {SecureStore} from 'expo';

import {View} from 'react-native';

import {TabNavigator, StackNavigator} from 'react-navigation';

import {
  Yfirlit,
  Welcome,
  Profile,
  Leit,
  Annad,
  Stundaskra,
  Skirteini,
  Event,
  Post,
  Tilbod
} from './Views';
import {AnimatedTabBar, Button} from './Components';
import {TOKEN_KEY} from './Consts/vars';

export const getActiveRouteName = navigationState => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

const Navigation = StackNavigator(
  {
    Main: {
      screen: TabNavigator(
        {
          Yfirlit: {screen: Yfirlit},
          Leit: {screen: Leit},
          Stundaskrá: {screen: Stundaskra},
          Annað: {screen: Annad}
        },
        {
          tabBarPosition: 'bottom',
          // swipeEnabled: true,
          animationEnabled: true,
          tabBarComponent: AnimatedTabBar,
          lazy: false
        }
      )
    },
    Profile: {
      screen: Profile
    },
    Skirteini: {
      screen: Skirteini
    },
    Event: {
      screen: Event
    },
    Post: {
      screen: Post
    },
    Tilbod: {
      screen: Tilbod
    }
  },
  {
    headerMode: 'none',
    // initialRouteName: 'Tilbod',
    cardStyle: {backgroundColor: 'white'}
  }
);

export default Navigation;
