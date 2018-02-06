import React from 'react';
import {View, StyleSheet, Text, Image, StatusBar, TouchableOpacity, Dimensions} from 'react-native';
import {LinearGradient, Constants} from 'expo';

import Svg, {Polygon} from 'react-native-svg';

import {TitleBar} from '../../../Components';

import {main} from '../../../Consts/gradients';

const Hero = () => {
  var {width} = Dimensions.get('window');

  return (
    <LinearGradient {...main} style={style.hero}>
      <Svg style={style.cutout}>
        <Polygon points={`0,30 ${width},0 ${width},30`} fill="white" />
      </Svg>
      <StatusBar barStyle="light-content" />
      <TitleBar title="Leit" white />
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  hero: {
    padding: 20,
    paddingTop: 1000,
    backgroundColor: 'transparent',
    marginTop: -1000,
    marginBottom: 140,
  },
  cutout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    flex: 1,
  },
  heroImage: {
    aspectRatio: 1920 / 1080,
  },
  heroImageContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  heroContent: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: 'white',
    // overflow: 'hidden',
    marginTop: 10,
    marginBottom: -120,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 13,
  },
  nextPeriod: {
    padding: 20,
    flexDirection: 'row',
    // color: '280A6E',
    alignItems: 'center',
  },
  period: {
    marginLeft: 'auto',
  },
  desc: {
    fontSize: 13,
    fontWeight: '600',
    color: '#280A6E',
    width: 100,
  },
  periodName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#280A6E',
    textAlign: 'right',
  },
  periodTime: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    color: '#280A6E',
  },
});

export default Hero;
