import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingOverlay = () => (
  <View style={styles.root}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoadingOverlay;
