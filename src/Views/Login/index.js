import React from 'react';
import {Text, View} from 'react-native';
import {withMappedNavigationProps} from 'react-navigation-props-mapper';

import {StackNavigator} from 'react-navigation';

import Welcome from './components/Welcome';
import Kennitala from './components/Kennitala';
import Code from './components/Code';
import Success from './components/Success';
import Header from './components/Header';

const WrappedLogin = props => {
  const Login = StackNavigator(
    {
      LoginWelcome: {screen: Welcome},
      LoginKennitala: {screen: Kennitala},
      LoginCode: {screen: withMappedNavigationProps(Code)},
      LoginSuccess: {
        screen: withMappedNavigationProps(p => (
          <Success {...p} initializeApp={props.initializeApp} />
        ))
      }
    },
    {
      headerMode: 'none',
      cardStyle: {
        shadowOpacity: 0
      }
    }
  );

  return <Login {...props} />;
};

export default WrappedLogin;
