import React from 'react';
import {Animated, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import BackChevron from './BackChevron';

const BackButton = ({
  onPress,
  labelVisible = true,
  dark = false,
  grey = false,
  labelOpacity
}) => (
  <TouchableOpacity
    style={style.root}
    onPress={onPress}
    hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}
  >
    <View style={style.chevron}>
      <BackChevron dark={dark} grey={grey} />
    </View>
    {labelVisible && (
      <Animated.Text
        style={[
          style.label,
          dark && style.dark,
          grey && style.grey,
          labelOpacity && {opacity: labelOpacity}
        ]}
      >
        Til baka
      </Animated.Text>
    )}
  </TouchableOpacity>
);

const style = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chevron: {
    transform: [{scale: 0.7}]
  },
  label: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 17,
    paddingBottom: 4
  },
  dark: {
    color: 'black'
  },
  grey: {
    color: 'rgb(177, 177, 177)'
  }
});

export default BackButton;
