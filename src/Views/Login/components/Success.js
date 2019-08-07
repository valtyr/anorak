import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import {Button, Particles, ProfilePicture} from '../../../Components';
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
    const {user} = this.props;

    const splitName = user.name && user.name.split(' ');
    const firstName = splitName && splitName[0];

    return (
      <Particles>
        <SafeAreaView style={styles.root}>
          <View style={styles.content}>
            <View style={styles.center}>
              <View style={styles.profilePictureBorder}>
                <ProfilePicture hash={user.imageHash} width={150} />
              </View>
              <Text style={styles.greeting}>Hæ {firstName}!</Text>
              <Text style={styles.subtitle}>Gott að sjá þig 😄</Text>
            </View>
            <Button title="Áfram" onPress={this.logIn} />
          </View>
        </SafeAreaView>
      </Particles>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureBorder: {
    borderRadius: 1000,
    padding: 5,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 22,
    marginTop: 15,
    fontWeight: '700',
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 5,
    opacity: 0.7,
  },
});
export default Success;
