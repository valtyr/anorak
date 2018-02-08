import React, {Component} from 'react';
import {View} from 'react-native';
import {SecureStore, AppLoading} from 'expo';

import GraphQLProvider from './src/Apollo';
import {TOKEN_KEY} from './src/Consts/vars';

import LoggedIn from './src/LoggedIn';
import {Login} from './src/Views';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splashScreen: true,
      token: null,
    };
  }

  componentDidMount() {
    this.initializeApp();
  }

  initializeApp = async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) this.setState({token, loggedIn: true});
    this.setState({splashScreen: false});
  };

  render() {
    const authenticated = this.state.token ? true : false;
    if (this.state.splashScreen) return <AppLoading />;
    return (
      <GraphQLProvider token={this.state.token}>
        {authenticated ? (
          <LoggedIn screenProps={{initializeApp: this.initializeApp}} />
        ) : (
          <Login screenProps={{initializeApp: this.initializeApp}} />
        )}
      </GraphQLProvider>
    );
  }
}

export default App;
