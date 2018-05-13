import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import BackChevron from './BackChevron';

const BackButton = ({onPress, labelVisible = true, dark = false}) => (
  <TouchableOpacity style={style.root} onPress={onPress}>
    <View style={style.chevron}>
      <BackChevron dark={dark} />
    </View>
    {labelVisible && <Text style={[style.label, dark && style.dark]}>Til baka</Text>}
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
  dark: {
    color: 'black',
  },
});

export default BackButton;
