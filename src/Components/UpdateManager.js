import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Animated,
  SafeAreaView
} from 'react-native';
import FadeInView from 'react-native-fade-in-view';

import {Updates} from 'expo';
import {FontAwesome} from 'react-native-vector-icons';

import {AppState, ErrorReporting} from '../Services';
import {Particles, Button} from '../Components';

class UpdateAvailable extends Component {
  state = {
    starY: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.starY, {
          toValue: -15,
          duration: 2000
        }),
        Animated.timing(this.state.starY, {
          toValue: 0,
          duration: 2000
        })
      ])
    ).start();
  }

  render() {
    const {onUpdate, dismiss} = this.props;

    return (
      <FadeInView style={styles.updateModal}>
        <StatusBar barStyle="dark-content" animated />
        <Particles>
          <View style={styles.inner}>
            <Animated.View
              style={{
                transform: [{translateY: this.state.starY}]
              }}
            >
              <FontAwesome name="star" size={60} color="black" />
            </Animated.View>
            <Text style={styles.header}>Ný uppfærsla</Text>
            <Text style={styles.explainer}>
              Það var að koma út uppfærsla á anorak! Ýttu á takkann að neðan til
              að byrja að nota hana strax.
            </Text>
          </View>
          <SafeAreaView>
            <View style={styles.update}>
              <Button onPress={onUpdate} title="Já takk" />
              <View style={styles.secondary}>
                <Button onPress={dismiss} secondary title="Bíðum með það" />
              </View>
            </View>
          </SafeAreaView>
        </Particles>
      </FadeInView>
    );
  }
}

class UpdateManager extends Component {
  state = {
    updateAvailable: false,
    promptDismissed: false,
    manifest: null
  };

  componentDidMount() {
    this.activeSubscription = AppState.subscribeToActive(this.checkForUpdate);
    this.activeAfterWhileSubscription = AppState.subscribeToActiveAfterWhile(
      this.onActiveAfterWhile
    );

    this.checkForUpdate();
  }

  checkForUpdate = async () => {
    const {updateAvailable} = this.state;
    if (updateAvailable) return;
    let updateInfo;
    try {
      updateInfo = await Updates.checkForUpdateAsync();
    } catch (e) {
      console.log(e);
      return;
    }
    const {isAvailable} = updateInfo;
    if (isAvailable) {
      this.downloadUpdate();
    }
  };

  downloadUpdate = async () => {
    let result;
    try {
      result = await Updates.fetchUpdateAsync();
    } catch (e) {
      console.log(`Error fetching update\n${JSON.stringify(result.manifest)}`);
      ErrorReporting.captureException(e);
      return;
    }
    this.setState({updateAvailable: true, promptDismissed: false});
  };

  reload = () => Updates.reloadFromCache();
  dismiss = () => this.setState({promptDismissed: true});

  componentWillUnmount() {
    this.activeSubscription.unsubscribe();
    this.activeAfterWhileSubscription.unsubscribe();
  }

  onActiveAfterWhile = () => {
    const {updateAvailable} = this.state;
    if (updateAvailable) this.reload();
  };

  render() {
    const {updateAvailable, promptDismissed} = this.state;
    const {children} = this.props;

    return (
      <View style={styles.root}>
        {children}
        {updateAvailable &&
          !promptDismissed && (
            <UpdateAvailable onUpdate={this.reload} dismiss={this.dismiss} />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  updateModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: 'white'
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontWeight: '600',
    fontSize: 20,
    marginTop: 30
  },
  explainer: {
    marginTop: 20,
    maxWidth: 220,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgb(110, 110, 110)'
  },
  update: {
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  secondary: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
});

export default UpdateManager;
