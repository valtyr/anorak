import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Entypo} from '@expo/vector-icons';

const Item = ({title, icon, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.root}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Entypo size={20} name="chevron-right" color="rgb(217, 217, 217)" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',

    shadowColor: 'black',
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,

    marginBottom: 20,
  },
  icon: {
    width: 40,
  },
  title: {
    flex: 1,
    color: 'rgb(113, 113, 113)',
    fontWeight: '500',
  },
});
export default Item;
