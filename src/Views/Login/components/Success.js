import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SecureStore} from 'expo';

import {Button} from '../../../Components';
import {TOKEN_KEY} from '../../../Consts/vars';
import {logIn} from '../../../Helpers/session';

class Success extends Component {
  componentDidMount() {
    const {token} = this.props;
    SecureStore.setItemAsync(TOKEN_KEY, token);
  }

  logIn = () => {
    const {token, initializeApp} = this.props;
    logIn(token, initializeApp);
  };

  render() {
    const {token} = this.props;
    return (
      <View style={styles.root}>
        <Text>Success!</Text>
        <Text>{token}</Text>
        <Button title="Init" onPress={this.logIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default Success;
