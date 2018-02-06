import React from 'react';
import {View, StyleSheet, Text, Image, StatusBar, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo';

import Svg, {Polygon} from 'react-native-svg';

import {mainReversed} from '../../../Consts/gradients';
import {ProfilePicture} from '../../../Components';

const Hero = ({profileImageHash, status}) => {
  var {width} = Dimensions.get('window');

  return (
    <View style={style.hero}>
      <StatusBar barStyle="light-content" />
      <LinearGradient {...mainReversed} style={style.gradient}>
        <Svg style={style.cutout}>
          <Polygon points={`0,40 0,0 ${width},40`} fill="white" />
        </Svg>
      </LinearGradient>
      <View style={style.profilePicture}>
        <ProfilePicture hash={profileImageHash} width={130} status={status} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  gradient: {
    height: 1100,
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
  profilePicture: {
    alignItems: 'center',
    marginTop: -80,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default Hero;
