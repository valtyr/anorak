import React from 'react';
import {View, StyleSheet, Text, Image, StatusBar, Dimensions} from 'react-native';
import {LinearGradient} from 'expo';

import Svg, {Polygon, Path} from 'react-native-svg';

import {main} from '../../../Consts/gradients';

const Hero = ({profileImageHash, status}) => {
  var {width} = Dimensions.get('window');

  return (
    <View style={style.hero}>
      <StatusBar barStyle="light-content" />
      <LinearGradient {...main} style={style.gradient}>
        <Svg style={style.cutout}>
          <Path
            d={`M0,40 C${width / 2},40 ${width /
              2},0 ${width},0 C${width},0 ${width},13.3333333 ${width},40 C66.6666667,40 0,40 0,40 Z`}
            fill="white"
          />
        </Svg>
      </LinearGradient>
    </View>
  );
};

const style = StyleSheet.create({
  gradient: {
    height: 1120,
  },
  hero: {
    backgroundColor: 'transparent',
    marginTop: -1000,
  },
  cutout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    flex: 1,
  },
});

export default Hero;
