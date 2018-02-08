import React from 'react';
import PropTypes from 'prop-types';
import {SecureStore} from 'expo';

import {View} from 'react-native';

import {TabNavigator, StackNavigator} from 'react-navigation';

import {Yfirlit, Welcome, Profile, Leit, Annad, Stundaskra} from './Views';
import {AnimatedTabBar, Button} from './Components';
import {TOKEN_KEY} from './Consts/vars';

const Navigation = StackNavigator(
  {
    Main: {
      screen: TabNavigator(
        {
          Yfirlit: {screen: Yfirlit},
          Leit: {screen: Leit},
          Stundaskrá: {screen: Stundaskra},
          Annað: {screen: Annad},
        },
        {
          tabBarPosition: 'bottom',
          swipeEnabled: true,
          animationEnabled: true,
          tabBarComponent: AnimatedTabBar,
          // lazyLoad: true,
        },
      ),
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {backgroundColor: 'white'},
  },
);

export default Navigation;
