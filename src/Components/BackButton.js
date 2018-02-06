import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import BackChevron from './BackChevron';

const BackButton = ({onPress}) => (
  <TouchableOpacity style={style.root} onPress={onPress}>
    <View style={style.chevron}>
      <BackChevron />
    </View>
    <Text style={style.label}>Til baka</Text>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    transform: [{scale: 0.7}],
  },
  label: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 17,
    paddingBottom: 4,
  },
});

export default BackButton;
