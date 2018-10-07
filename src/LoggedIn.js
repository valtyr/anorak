import React, {Component} from 'react';
import {Alert} from 'react-native';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import {Notifications} from 'expo';

import {registerForNotifications} from './Helpers/notificationSetup';
import {ErrorReporting} from './Services';
import Navigation from './Navigation';

class LoggedIn extends Component {
  componentDidMount() {
    const {setToken} = this.props;
    registerForNotifications(setToken);

    this.notificationListener = Notifications.addListener(this.onNotification);
  }

  componentWillUnmount() {
    this.notificationListener.remove();
  }

  acceptLoginRequest = id => {
    const {acceptLoginRequest} = this.props;
    acceptLoginRequest(id)
      .then(({ok}) => console.log(ok))
      .catch(err => console.log(err));
  };

  declineLoginRequest = id => {
    const {declineLoginRequest} = this.props;
    declineLoginRequest(id)
      .then(({ok}) => console.log(ok))
      .catch(err => console.log(err));
  };

  onNotification = notification => {
    console.log(notification);
    switch (notification.data.type) {
      case 'login_request':
        return Alert.alert(
          'Innskráningarbeiðni',
          'Ýttu á "Leyfa" til að skrá þig inn á stjórnborð anorak. Ef þú varst ekki að reyna að skrá þig inn ýttu á "Hundsa"',
          [
            {
              text: 'Hundsa',
              style: 'cancel',
              onPress: () => this.declineLoginRequest(notification.data.id)
            },
            {
              text: 'Leyfa',
              onPress: () => this.acceptLoginRequest(notification.data.id)
            }
          ]
        );
      default:
        return Alert.alert('Tilkynning', '', [{text: 'Loka'}]);
    }
  };

  componentDidUpdate(oldProps) {
    const {data} = this.props;
    if (data && data.currentUser)
      ErrorReporting.setUserContext(data.currentUser);
  }

  render() {
    const {initializeApp} = this.props;
    return <Navigation screenProps={{initializeApp}} />;
  }
}

const SetTokenMutation = gql`
  mutation setTokenMutation($token: String!) {
    setNotificationToken(token: $token) {
      ok
    }
  }
`;

const AcceptLoginRequestMutation = gql`
  mutation acceptLoginRequestMutation($id: UUID!) {
    acceptLoginRequest(id: $id) {
      ok
    }
  }
`;

const DeclineLoginRequestMutation = gql`
  mutation declineLoginRequestMutation($id: UUID!) {
    declineLoginRequest(id: $id) {
      ok
    }
  }
`;

const UserQuery = gql`
  query currentUser {
    currentUser {
      id
      name
      phone {
        countrycode
        number
      }
      school {
        id
        name
        code
      }
    }
  }
`;

export default compose(
  graphql(SetTokenMutation, {
    props: ({mutate}) => ({
      setToken: token =>
        mutate({
          variables: {token}
        })
    })
  }),
  graphql(AcceptLoginRequestMutation, {
    props: ({mutate}) => ({
      acceptLoginRequest: id =>
        mutate({
          variables: {id}
        })
    })
  }),
  graphql(DeclineLoginRequestMutation, {
    props: ({mutate}) => ({
      declineLoginRequest: id =>
        mutate({
          variables: {id}
        })
    })
  }),
  graphql(UserQuery)
)(LoggedIn);
