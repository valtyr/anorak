import React from 'react';
import {View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {LinearGradient} from 'expo';

import Cutout from './Cutout';
import {main} from '../Consts/gradients';

const Hero = ({title, reverse, gradient}) => {
  var {width} = Dimensions.get('window');

  const grad = gradient || main;

  return (
    <View style={[styles.hero]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient {...grad} style={styles.gradient}>
        <Cutout width={width} reverse={reverse} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 1120,
  },
  hero: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    marginTop: -1000,
    marginBottom: -120,
  },
});
export default Hero;
