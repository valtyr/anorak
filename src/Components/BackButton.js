import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import BackChevron from './BackChevron';

const BackButton = ({
  onPress,
  labelVisible = true,
  dark = false,
  grey = false
}) => (
  <TouchableOpacity style={style.root} onPress={onPress}>
    <View style={style.chevron}>
      <BackChevron dark={dark} grey={grey} />
    </View>
    {labelVisible && (
      <Text style={[style.label, dark && style.dark, grey && style.grey]}>
        Til baka
      </Text>
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
