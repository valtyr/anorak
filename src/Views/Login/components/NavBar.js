import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import {BackButton} from '../../../Components';

const NavBar = ({title, onBack}) => (
  <View style={styles.root}>
    {onBack && <BackButton labelVisible={false} dark onPress={onBack} />}
    <Text style={[styles.title, onBack && styles.pad]}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    ...Platform.select({
      android: {
        paddingTop: 25
      }
    })
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
    flex: 1
  },
  pad: {
    paddingRight: 15
  }
});

export default NavBar;
