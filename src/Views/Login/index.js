import React from 'react';
import {Text, View} from 'react-native';
import {withMappedNavigationProps} from 'react-navigation-props-mapper';

import {StackNavigator} from 'react-navigation';
import Welcome from './components/Welcome';
import Kennitala from './components/Kennitala';
import Code from './components/Code';
import Success from './components/Success';
import Header from './components/Header';

const Login = StackNavigator(
  {
    LoginWelcome: {screen: Welcome},
    LoginKennitala: {screen: Kennitala},
    LoginCode: {screen: withMappedNavigationProps(Code)},
    LoginSuccess: {screen: withMappedNavigationProps(Success)},
  },
  {
    headerMode: 'none',
    cardStyle: {
      shadowOpacity: 0,
    },
  },
);

export default Login;
