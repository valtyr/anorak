import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TitleBar = ({title, children, white}) => (
  <View style={styles.root}>
    <Text style={white ? styles.whiteTitle : styles.title}>{title || 'ögn'}</Text>
    <View style={styles.childWrapper}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
  },
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
