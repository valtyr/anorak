import React from 'react';
import {View, StyleSheet, Text, Image, StatusBar, TouchableOpacity, Dimensions} from 'react-native';
import {LinearGradient, Constants} from 'expo';

import Svg, {Polygon} from 'react-native-svg';

import {TitleBar} from '../../../Components';

import {main} from '../../../Consts/gradients';

const Hero = () => {
  var {width} = Dimensions.get('window');

  return (
    <View>
      <LinearGradient {...main} style={style.gradient}>
        <Svg style={style.cutout}>
          <Polygon points={`0,30 ${width},0 ${width},30`} fill="white" />
        </Svg>
      </LinearGradient>

      <StatusBar barStyle="light-content" />
      <View style={style.contentWrapper}>
        <TitleBar title="Yfirlit" white />
        <View style={style.heroContent}>
          <TouchableOpacity style={style.heroImageContainer} activeOpacity={0.6}>
            <Image
              source={{
                uri: 'https://ogn.imgix.net/fordistokkur.jpg',
              }}
              style={style.heroImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.nextPeriod}>
            <Text style={style.desc}>Næsti tíminn þinn er</Text>
            <View style={style.period}>
              <Text style={style.periodName}>Eðl 101</Text>
              <Text style={style.periodTime}>kl. 12:30</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  gradient: {
    padding: 20,
    paddingTop: 1000,
    backgroundColor: 'transparent',
    marginTop: -800,
    overflow: 'visible',
  },
  cutout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    flex: 1,
    transform: [{scale: 1.1}],
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
  contentWrapper: {
    marginTop: -200,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
  },
  heroContent: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 13,
    zIndex: 2,
    elevation: 10,
    marginTop: 10,
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
