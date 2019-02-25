import React, {Component} from 'react';
import {View} from 'react-native';
import {SecureStore, AppLoading} from 'expo';

import GraphQLProvider from './src/Apollo';
import {TOKEN_KEY} from './src/Consts/vars';

import {ErrorReporting, Analytics} from './src/Services';

import {
  NetworkStatus,
  BlockingUpdateManager,
  UpdateManager
} from './src/Components';

import LoggedIn from './src/LoggedIn';
import {Login} from './src/Views';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splashScreen: true,
      token: null
    };
  }

  componentDidMount() {
    this.initializeApp();
  }

  initializeApp = async () => {
    ErrorReporting.init();
    Analytics.init();

    let token;
    try {
      token = await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (e) {
      SecureStore.deleteItemAsync(TOKEN_KEY);
      ErrorReporting.captureException(e);
    }
    if (token) this.setState({token: token || null, loggedIn: true});
    this.setState({splashScreen: false});
  };

  render() {
    const authenticated = this.state.token ? true : false;
    if (this.state.splashScreen) return <AppLoading />;
    if (authenticated) {
      return (
        <NetworkStatus>
          <GraphQLProvider token={this.state.token}>
            <UpdateManager>
              <LoggedIn initializeApp={this.initializeApp} />
            </UpdateManager>
          </GraphQLProvider>
        </NetworkStatus>
      );
    }
    return (
      <NetworkStatus>
        <GraphQLProvider>
          <BlockingUpdateManager>
            <Login initializeApp={this.initializeApp} />
          </BlockingUpdateManager>
        </GraphQLProvider>
      </NetworkStatus>
    );
  }
}

export default App;
