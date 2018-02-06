import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {registerForNotifications} from './Helpers/notificationSetup';
import Navigation from './Navigation';

class LoggedIn extends Component {
  componentDidMount() {
    const {setToken} = this.props;
    registerForNotifications(setToken);
  }

  render() {
    return <Navigation />;
  }
}

const SetTokenMutation = gql`
  mutation setTokenMutation($token: String!) {
    setNotificationToken(token: $token) {
      ok
    }
  }
`;

export default graphql(SetTokenMutation, {
  props: ({mutate}) => ({
    setToken: token =>
      mutate({
        variables: {token},
      }),
  }),
})(LoggedIn);
