import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TitleBar = ({title, children, white}) => (
  <View style={styles.root}>
    <Text style={white ? styles.whiteTitle : styles.title}>{title || 'ögn'}</Text>
    <View style={styles.childWrapper}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  root: {},
  title: {
    fontSize: 36,
    fontWeight: '600',
  },
  whiteTitle: {
    color: 'white',
    fontSize: 36,
    fontWeight: '600',
  },
  childWrapper: {},
});

export default TitleBar;
