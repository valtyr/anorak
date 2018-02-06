import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const NameAndGroup = ({name, group}) => (
  <View style={styles.root}>
    <Text style={styles.name}>{name}</Text>
    <View style={styles.groupContainer}>
      <View style={styles.groupSeparator} />
      <Text style={styles.group}>{group}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {marginBottom: 20},
  name: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 25,
    lineHeight: 35,
  },
  groupContainer: {
    alignItems: 'center',
  },
  groupSeparator: {
    width: 60,
    height: 2,
    backgroundColor: 'rgb(228, 228, 228)',
    marginTop: 10,
    marginBottom: 10,
  },
  group: {
    fontSize: 18,
    color: 'rgb(128, 128, 128)',
    fontWeight: '500',
  },
});

export default NameAndGroup;
