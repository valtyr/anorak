import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SecureStore} from 'expo';

import {Button} from '../../../Components';

import {TOKEN_KEY} from '../../../Consts/vars';

class Success extends Component {
  componentDidMount() {
    const {token} = this.props;
    SecureStore.setItemAsync(TOKEN_KEY, token);
  }

  render() {
    const {token, screenProps} = this.props;
    console.log(screenProps);
    return (
      <View style={styles.root}>
        <Text>Success!</Text>
        <Text>{token}</Text>
        <Button title="Init" onPress={() => screenProps.initializeApp} />
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
