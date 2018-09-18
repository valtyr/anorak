import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StatusBar,
  StyleSheet
} from 'react-native';
import {Updates} from 'expo';

import {ErrorReporting, AppState} from '../Services';

import Particles from './Particles';

class BlockingUpdateManager extends Component {
  state = {
    isUpdating: false
  };

  componentDidMount() {
    this.checkForUpdate();
    this.subscription = AppState.subscribeToActive(() => this.checkForUpdate());
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  checkForUpdate = async () => {
    let result;
    try {
      result = await Updates.checkForUpdateAsync();
    } catch (e) {
      console.log(e);
      return;
    }
    if (result && result.isAvailable) {
      this.setState({isUpdating: true});
      let success = true;
      try {
        await Updates.fetchUpdateAsync();
      } catch (e) {
        success = false;
        console.log(
          `Error fetching update\n${JSON.stringify(result.manifest)}`
        );
        ErrorReporting.captureException(e);
      }
      if (success) {
        Updates.reloadFromCache();
      }
      this.setState({isUpdating: false});
    }
  };

  render() {
    const {children} = this.props;
    const {isUpdating} = this.state;

    if (isUpdating) {
      return (
        <Particles>
          <View style={styles.root}>
            <StatusBar barStyle="dark-content" animated />
            <ActivityIndicator size="large" animating />
            <Text style={styles.header}>Dokaðu við</Text>
            <Text style={styles.explainer}>
              Við erum að sækja nýjustu útgáfuna af anorak fyrir þig.
            </Text>
          </View>
        </Particles>
      );
    }

    return children;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontWeight: '600',
    fontSize: 20,
    marginTop: 30
  },
  explainer: {
    marginTop: 10,
    maxWidth: 200,
    textAlign: 'center',
    color: 'rgb(110, 110, 110)'
  }
});

export default BlockingUpdateManager;
