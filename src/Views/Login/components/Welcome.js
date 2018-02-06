import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {Button, TitleBar} from '../../../Components';
import {WelcomeMessage} from '../../../Icons';
import Header from './Header';

const Welcome = ({navigation}) => (
  <View style={styles.root}>
    <View style={styles.content}>
      {/* <WelcomeMessage /> */}
      <Text style={styles.text}>Vertu með</Text>
      <Text style={[styles.text, styles.outline]}>allt á hreinu</Text>
    </View>
    <Button title="Innskráning" onPress={() => navigation.navigate('LoginKennitala')} />
  </View>
);

Welcome.navigationOptions = () => ({
  header: Header,
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    padding: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
  outline: {
    marginTop: -20,
    padding: 10,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowRadius: 10,
    textShadowOffset: {width: 1, height: 1},
    textAlign: 'center',
  },
});

export default Welcome;
