import React from 'react';
import {View, TextInput, StyleSheet, Dimensions, SafeAreaView, Platform, TouchableOpacity, Text} from 'react-native';
import Svg, {Polygon} from 'react-native-svg';
import {LinearGradient} from 'expo';

import {MaterialCommunityIcons} from '@expo/vector-icons';

import {mainReversed} from '../../../Consts/gradients';
import {SearchIcon} from '../../../Icons';

const SearchBar = ({search, onChangeText}) => {
  var {width} = Dimensions.get('window');
  return (
    <View style={style.root}>
      <LinearGradient {...mainReversed} style={style.gradient}>
        <Svg style={style.cutout}>
          <Polygon points={`0,30 ${width},0 ${width},30`} fill="white" />
        </Svg>
      </LinearGradient>
      <SafeAreaView>
        <View style={style.barContainer}>
          <View style={style.icon}>
            <SearchIcon />
          </View>
          <TextInput
            autoCorrect={false}
            value={search}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            placeholder="Leit"
            style={style.input}
            hitSlop={{top: 50, bottom: 50}}
          />
          {search !== '' &&
            search && (
              <TouchableOpacity style={style.closeButton} onPress={() => onChangeText('')}>
                <MaterialCommunityIcons name="close-circle" size={20} color="rgb(228, 228, 228)" />
              </TouchableOpacity>
            )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    position: 'relative',
    ...Platform.select({
      android: {
        paddingTop: 35,
      },
    }),
    zIndex: 10,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    marginBottom: 20,
  },
  barContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 13,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    height: 50,
    backgroundColor: 'white',
  },
  icon: {
    width: 20,
    height: 20,
  },

  cutout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    transform: [{scale: 1.1}],
  },
});

export default SearchBar;
