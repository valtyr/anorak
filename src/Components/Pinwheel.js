import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Pinwheel = () => (
  <View style={styles.root}>
    <ActivityIndicator animating />
  </View>
);

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default Pinwheel;
