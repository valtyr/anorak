import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';

import {Button, TitleBar, Particles} from '../../../Components';
import Header from './Header';

const Welcome = ({navigation}) => (
  <View style={styles.root}>
    <StatusBar barStyle="dark-content" />
    <Particles>
      <View style={styles.content}>
        <Text style={styles.title}>anorak</Text>
        <Button
          title="Skrá inn"
          onPress={() => navigation.navigate('LoginKennitala')}
        />
      </View>
    </Particles>
  </View>
);

Welcome.navigationOptions = () => ({
  header: Header
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 40,
    padding: 10,
    fontWeight: '800',
    textAlign: 'center'
  }
});

export default Welcome;
