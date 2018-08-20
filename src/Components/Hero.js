import React from 'react';
import {View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {LinearGradient} from 'expo';

import Cutout from './Cutout';
import {main} from '../Consts/gradients';

const Hero = ({reverse, gradient, noVerticalFill = false}) => {
  var {width} = Dimensions.get('window');

  const grad = gradient || main;

  return (
    <View style={[styles.hero]}>
      <LinearGradient
        {...grad}
        style={[styles.gradient, noVerticalFill && styles.noVerticalFill]}
      >
        <Cutout width={width} reverse={reverse} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 1120
  },
  hero: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    marginTop: -900,
    marginBottom: -120
  },
  noVerticalFill: {
    height: 1032
  }
});
export default Hero;
